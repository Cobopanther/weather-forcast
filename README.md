# Weather Forecast Dashboard 🌦️

A modern, interactive web dashboard for predicting and visualizing weather in Kerala, India. Powered by a machine learning model trained on historical weather data, this app provides daily and 7-day forecasts with beautiful charts, dark/light mode, and a responsive UI.

---

## 🚀 Features
- **ML-powered weather prediction** for any date
- **7-day forecast** with interactive line chart
- **Modern, glassmorphism UI** with dark/light mode toggle
- **Summary cards** for key stats (temperature, humidity, rain)
- **Responsive design** for desktop and mobile
- **Beautiful tables and charts** (Chart.js)
- **No large files in repo** (see below)

---

## 🗂️ Project Structure
```
weather-forcast/
├── static/
│   ├── images/           # Weather icons
│   ├── predict.css       # Main CSS (light/dark, glassmorphism)
│   └── ...
├── templates/
│   └── predict.html      # Main dashboard template
├── kerala weather.csv    # Your weather data (not in repo)
├── weather.py            # Flask web app (run this to start dashboard)
├── test.py               # Model training script (run this first)
├── weather_model.pkl     # Trained model (not in repo)
├── label_encoder.pkl     # Label encoder (not in repo)
├── .gitignore            # Ignores large files
├── README.md             # This file
└── ...
```

---

## ⚡ Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/Cobopanther/weather-forcast.git
cd weather-forcast
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Prepare your data
- Place your historical weather data as `kerala weather.csv` in the project root.

### 4. Train the model (**must do this first!**)
```bash
python test.py
```
- This will generate `weather_model.pkl` and `label_encoder.pkl` in your project folder.

### 5. Run the web dashboard
```bash
python weather.py
```
- Open your browser at [http://localhost:5000](http://localhost:5000)

---

## 📝 Notes
- **Model files (`weather_model.pkl`, `label_encoder.pkl`) are NOT in the repo** (too large for GitHub). You must train or download them yourself.
- To ignore large files, see `.gitignore`.
- For deployment, upload model files to a cloud storage and download on server start.

---

## 🛠️ Tech Stack
- **Backend:** Python, Flask, scikit-learn, joblib
- **Frontend:** HTML, CSS (custom, glassmorphism), Chart.js, Jinja2
- **ML Model:** RandomForestRegressor (multi-output)

---

## 🖼️ Screenshots
> _Add your screenshots here!_

---

## 🤝 Contributing
Pull requests and suggestions are welcome! For major changes, please open an issue first.

---

## 📄 License
MIT