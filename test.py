import tkinter as tk
from tkinter import messagebox
import requests
from datetime import datetime

# --------------------------
# Constants
# --------------------------
API_KEY = '5f98b57ecbfe412fe86149a3c60e15d9'
BASE_URL = 'https://api.openweathermap.org/data/2.5/'

# --------------------------
# Weather Fetch Function
# --------------------------
def get_weather(city):
    try:
        url = f'{BASE_URL}weather?q={city}&appid={API_KEY}&units=metric'
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200:
            raise Exception(data.get("message", "Failed to get weather"))

        now = datetime.now()
        time_str = now.strftime("%I:%M %p")  # 12-hour format
        date_str = now.strftime("%A, %d %B %Y")  # e.g., Tuesday, 02 July 2025

        # Precipitation info (optional; not always in response)
        precipitation = "N/A"
        if "rain" in data and "1h" in data["rain"]:
            precipitation = f"{data['rain']['1h'] * 100:.0f}%"

        return {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': round(data['main']['temp']),
            'feels_like': round(data['main']['feels_like']),
            'min_temp': round(data['main']['temp_min']),
            'max_temp': round(data['main']['temp_max']),
            'humidity': data['main']['humidity'],
            'wind_speed': round(data['wind']['speed'] * 3.6, 1),  # m/s to km/h
            'description': data['weather'][0]['description'].title(),
            'precipitation': precipitation,
            'date': date_str,
            'time': time_str
        }
    except Exception as e:
        return {'error': str(e)}

# --------------------------
# UI Function
# --------------------------
def show_weather():
    city = city_entry.get()
    if not city:
        messagebox.showwarning("Input Required", "Please enter a city name.")
        return

    weather = get_weather(city)

    if 'error' in weather:
        messagebox.showerror("Error", weather['error'])
    else:
        result_text.set(
            f"{weather['date']}  |  {weather['time']}\n\n"
            f"📍 City: {weather['city']}, {weather['country']}\n"
            f"🌤️ Weather: {weather['description']}\n"
            f"🌡️ Temperature: {weather['temperature']}°C\n"
            f"🤒 Feels Like: {weather['feels_like']}°C\n"
            f"🔻 Min Temp: {weather['min_temp']}°C\n"
            f"🔺 Max Temp: {weather['max_temp']}°C\n"
            f"💧 Humidity: {weather['humidity']}%\n"
            f"💦 Precipitation (1h): {weather['precipitation']}\n"
            f"🌬️ Wind Speed: {weather['wind_speed']} km/h"
        )

# --------------------------
# Tkinter UI
# --------------------------
root = tk.Tk()
root.title("Weather Forecasting System")
root.geometry("430x500")
root.resizable(False, False)

# Fonts & Styling
title_font = ("Helvetica", 16, "bold")
label_font = ("Helvetica", 12)

# Title Label
tk.Label(root, text="Weather Forecast", font=title_font).pack(pady=10)

# City Input
tk.Label(root, text="Enter City:", font=label_font).pack()
city_entry = tk.Entry(root, font=label_font, justify='center')
city_entry.pack(pady=5)

# Search Button
search_btn = tk.Button(root, text="Get Weather", font=label_font, command=show_weather)
search_btn.pack(pady=10)

# Weather Result Display
result_text = tk.StringVar()
result_label = tk.Label(root, textvariable=result_text, font=label_font, justify='left', wraplength=400)
result_label.pack(pady=10)

# Run the app
root.mainloop()
