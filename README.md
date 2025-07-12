
# 🌤️ Kerala Weather Forecast Dashboard

An interactive web application to **predict and visualize daily and 7-day weather forecasts** for Kerala, India. Powered by a **machine learning model** trained on historical weather data, this dashboard features modern UI design with responsive charts, dark/light mode, and insightful weather summaries.

---

## 📌 Features

- 🔮 **ML-powered weather prediction** for custom dates
- 📅 **7-day forecast** with an interactive line chart
- 🌗 **Light and dark mode toggle** with glassmorphism styling
- 📊 **Summary cards** for temperature, humidity, rain, etc.
- 📱 **Responsive design** for desktop and mobile
- 📈 **Beautiful charts and tables** using Chart.js
- 🚫 **No large model files in repo** — generate or download as needed

---

## 🧭 Project Structure

```
weather-forcast/
├── static/                 # CSS, icons, and assets
│   ├── images/
│   ├── predict.css
│   └── ...
├── templates/              # HTML template
│   └── predict.html
├── kerala weather.csv      # Weather data (add your dataset)
├── weather.py              # Flask web app (run this to start)
├── test.py                 # Model training script (run this first)
├── weather_model.pkl       # Trained model (generated)
├── label_encoder.pkl       # Encoded weather labels (generated)
├── requirements.txt        # Python dependencies
├── .gitignore              # Ignore large/model files
└── README.md               # This file
```

---

## 🚀 Quick Start Guide

### 📥 1. Clone the Repository

```bash
git clone https://github.com/Cobopanther/weather-forcast.git
cd weather-forcast
```

### 📦 2. Install Requirements

Install the necessary Python packages:

```bash
pip install -r requirements.txt
```

### 📁 3. Add Your Dataset

Place your historical weather data CSV file in the project root as:

```
kerala weather.csv
```

### 🧠 4. Train the Model (Do This First!)

Run the model training script:

```bash
python test.py
```

This generates the following files:
- `weather_model.pkl`

> ⚠️ These files are not included in the repository — you must generate them.

### 🌐 5. Run the Dashboard

Start the Flask web application:

```bash
python weather.py
```

Then, open your browser and go to:
```
http://localhost:5000
```

---

## 🛠 Tech Stack

| Layer     | Tech                         |
|-----------|------------------------------|
| Backend   | Python, Flask, scikit-learn  |
| ML Model  | RandomForestRegressor        |
| Frontend  | HTML, CSS, Chart.js, Jinja2  |
| Styling   | Custom CSS with glassmorphism |

---

## 📌 Notes

- `weather_model.pkl` and `label_encoder.pkl` are generated during training. These files are **too large for GitHub** and are excluded via `.gitignore`.
- For production deployment, consider uploading model files to a cloud storage and loading them dynamically.

---

## 🖼️ Screenshots

<img width="1919" height="861" alt="image" src="https://github.com/user-attachments/assets/1161ca5c-6f50-4bf6-b486-5a1861b31294" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/1350c28e-3d20-4698-b513-7282000008bc" />
<img width="1919" height="865" alt="image" src="https://github.com/user-attachments/assets/7ed5a49e-81b2-48bf-86cd-3c7c5814eaef" />
<img width="1919" height="876" alt="Screenshot 2025-07-12 222419" src="https://github.com/user-attachments/assets/36f747db-7bc3-4d7e-891e-f035f58972df" />
<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/1724189c-a91c-4ea0-a34d-8f4f66a4f4b0" />
<img width="1919" height="852" alt="image" src="https://github.com/user-attachments/assets/025fb3f8-09d5-4c10-a878-32d45eadabf1" />




---

## 🤝 Contributing

Contributions are welcome! Please:
- Open an issue for bugs or feature requests.
- Submit a pull request with improvements or fixes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
