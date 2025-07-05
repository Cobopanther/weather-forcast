const API_KEY = "5f98b57ecbfe412fe86149a3c60e15d9";

// On load, get current location weather
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      fetchWeather(url);
    }, () => {
      document.getElementById("locationText").textContent = "Location access denied.";
    });
  }
};

// Get weather by city
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetchWeather(url);
}

// Convert degrees to compass
function getWindDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}

// Fetch and update UI
function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const nowUTC = new Date();
      const utcTime = nowUTC.getTime() + (nowUTC.getTimezoneOffset() * 60000);
      const cityTime = new Date(utcTime + (data.timezone * 1000));
      document.getElementById("locationText").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("date").textContent = cityTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      document.getElementById("time").textContent = cityTime.toLocaleTimeString('en-US');
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;

      const description = data.weather[0].description;
      document.getElementById("descriptionText").textContent = description;

      // Set weather icon
      let iconSrc = "/images/cloudy.png";
      if (description.includes("rain")) iconSrc = "/static/images/rain.png";
      else if (description.includes("overcast")) iconSrc = "/static/images/cloudy.png";
      else if (description.includes("clear")) iconSrc = "/static/images/clear.png";
      else if (description.includes("snow")) iconSrc = "/static/images/snow.png";
      else if (description.includes("thunder")) iconSrc = "/static/images/thunder.png";
      else if (description.includes("cloud")) iconSrc = "/static/images/cloudy.png";
      document.getElementById("weatherIcon").src = iconSrc;

      document.getElementById("feels_like").textContent = `${Math.round(data.main.feels_like)}°C`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("min_temp").textContent = `${Math.round(data.main.temp_min)}°C`;
      document.getElementById("max_temp").textContent = `${Math.round(data.main.temp_max)}°C`;
      document.getElementById("wind_speed").textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
      document.getElementById("wind_direction").textContent = getWindDirection(data.wind.deg);

      // Background video
      const desc = description.toLowerCase();
      let videoPath = "static/videos/CLEAR.mp4"; // Default video
      
      if (desc.includes("rain") || desc.includes("drizzle")) {
        videoPath = "static/videos/RAINY.mp4";
      } else if (desc.includes("snow") || desc.includes("sleet")) {
        videoPath = "static/videos/SNOWY.mp4";
      } else if (desc.includes("storm") || desc.includes("thunder") || desc.includes("lightning")) {
        videoPath = "static/videos/STORMY.mp4";
      } else if (desc.includes("cloud") || desc.includes("overcast") || desc.includes("partly")) {
        videoPath = "static/videos/partlycloudy.mp4";
      } else if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze")) {
        videoPath = "static/videos/FOGGY.mp4";
      } else if (desc.includes("wind") || desc.includes("breeze")) {
        videoPath = "static/videos/WINDY.mp4";
      } else if (desc.includes("clear") || desc.includes("sunny")) {
        videoPath = "static/videos/SUNNY.mp4";
      }

      const video = document.getElementById("bgVideo");
      const videoSource = video.querySelector("source");
      if (videoSource.src !== window.location.origin + "/" + videoPath) {
        videoSource.src = videoPath;
        video.load();
        video.play().catch(e => console.log("Video autoplay failed:", e));
      }
    })
    .catch(err => {
      console.error("Weather fetch error:", err);
    });
}

// City suggestions
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
