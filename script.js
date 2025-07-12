const API_KEY = "5f98b57ecbfe412fe86149a3c60e15d9";

// Load weather on page load using geolocation
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        fetchWeather(url);
      },
      () => {
        document.getElementById("locationText").textContent = "Location access denied.";
      }
    );
  }
};

// Get weather by city name
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetchWeather(url);
}

// Convert wind degrees to compass direction
function getWindDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}

// Main function to fetch and update weather data
function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const nowUTC = new Date();
      const utcTime = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
      const cityTime = new Date(utcTime + data.timezone * 1000);

      document.getElementById("locationText").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("date").textContent = cityTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      document.getElementById("time").textContent = cityTime.toLocaleTimeString('en-US');
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;

      const description = data.weather[0].description.toLowerCase();
      document.getElementById("descriptionText").textContent = description;

      // Default icons/videos
      let iconSrc = "static/images/cloudy.png";
      let videoPath = "static/videos/SUNNY.mp4";

      // Match weather condition
      if (description.includes("rain") || description.includes("drizzle")) {
        iconSrc = "static/images/rain.png";
        videoPath = "static/videos/RAINY.mp4";
      } else if (description.includes("snow") || description.includes("sleet")) {
        iconSrc = "static/images/snowflake.png";
        videoPath = "static/videos/SNOWY.mp4";
      } else if (description.includes("storm") || description.includes("thunder") || description.includes("lightning")) {
        iconSrc = "static/images/storm.png";
        videoPath = "static/videos/STORMY.mp4";
      } else if (description.includes("cloud") || description.includes("overcast") || description.includes("partly")) {
        iconSrc = "static/images/cloudy.png";
        videoPath = "static/videos/partlycloudy.mp4";
      } else if (description.includes("fog") || description.includes("mist") || description.includes("haze")) {
        iconSrc = "static/images/weather.png";
        videoPath = "static/videos/FOGGY.mp4";
      } else if (description.includes("wind") || description.includes("breeze")) {
        iconSrc = "static/images/wind.png";
        videoPath = "static/videos/WINDY.mp4";
      } else if (description.includes("clear") || description.includes("sunny")) {
        iconSrc = "static/images/clear.png";
        videoPath = "static/videos/SUNNY.mp4";
      }

      document.getElementById("weatherIcon").src = iconSrc;

      document.getElementById("feels_like").textContent = `${Math.round(data.main.feels_like)}°C`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("min_temp").textContent = `${Math.round(data.main.temp_min)}°C`;
      document.getElementById("max_temp").textContent = `${Math.round(data.main.temp_max)}°C`;
      document.getElementById("wind_speed").textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
      document.getElementById("wind_direction").textContent = getWindDirection(data.wind.deg);

      const video = document.getElementById("bgVideo");
      const videoSource = video.querySelector("source");

      if (!videoSource.src.includes(videoPath)) {
        videoSource.src = videoPath;
        video.load();
        video.play().catch(err => console.log("Video play failed:", err));
      }
    })
    .catch(err => {
      console.error("Error fetching weather:", err);
    });
}

// Auto-suggestions for city input
function getSuggestions(query) {
  const suggestionBox = document.getElementById("suggestions");
  if (query.length < 2) {
    suggestionBox.innerHTML = "";
    return;
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
  fetch(geoUrl)
    .then(res => res.json())
    .then(locations => {
      suggestionBox.innerHTML = "";
      locations.forEach(loc => {
        const div = document.createElement("div");
        div.textContent = `${loc.name}, ${loc.country}`;
        div.onclick = () => {
          document.getElementById("searchInput").value = div.textContent;
          suggestionBox.innerHTML = "";
          getWeatherByCity(loc.name);
        };
        suggestionBox.appendChild(div);
      });
    });
}
