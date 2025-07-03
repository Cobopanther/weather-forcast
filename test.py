import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
import joblib
from datetime import datetime

# ✅ Load dataset
df = pd.read_csv("kerala weather.csv")

# ✅ Clean and prepare data
df['datetime'] = pd.to_datetime(df['datetime'], errors='coerce')
columns_to_drop = ['name', 'sunrise', 'sunset', 'description', 'icon', 'stations']
df = df.drop(columns=columns_to_drop, errors='ignore')
df = df.dropna(subset=['temp', 'tempmax', 'tempmin', 'humidity', 'windspeed', 'precip', 'conditions', 'datetime'])

# ✅ Feature engineering
df['year'] = df['datetime'].dt.year
df['month'] = df['datetime'].dt.month
df['day'] = df['datetime'].dt.day
df['dayofweek'] = df['datetime'].dt.dayofweek

# ✅ Encode weather condition and rain
label_encoder = LabelEncoder()
df['conditions_encoded'] = label_encoder.fit_transform(df['conditions'].astype(str))
df['will_rain'] = df['conditions'].str.contains('Rain', case=False).astype(int)

# ✅ Features and targets
X = df[['year', 'month', 'day', 'dayofweek']]
y = df[['temp', 'tempmax', 'tempmin', 'humidity', 'windspeed', 'precip', 'conditions_encoded', 'will_rain']]

# ✅ Train-test split and model training
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))
model.fit(X_train, y_train)

# ✅ Save model and encoder
joblib.dump(model, "weather_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

# ✅ Load and Predict
model = joblib.load("weather_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# ✅ Ask for user input
date_str = input("📅 Enter a date (DD-MM-YYYY): ")

try:
    input_date = datetime.strptime(date_str, "%d-%m-%Y")
    input_features = pd.DataFrame([{
        'year': input_date.year,
        'month': input_date.month,
        'day': input_date.day,
        'dayofweek': input_date.weekday()
    }])

    # Predict
    prediction = model.predict(input_features)[0]
    condition_decoded = label_encoder.inverse_transform([int(round(prediction[6]))])[0]
    will_rain = "Yes" if round(prediction[7]) == 1 else "No"

    # Output
    print(f"\n📊 Predicted Weather for {input_date.strftime('%d-%m-%Y')}")
    print(f"🌡 Temperature: {prediction[0]:.2f} °C")
    print(f"🌡 Max Temp: {prediction[1]:.2f} °C")
    print(f"🌡 Min Temp: {prediction[2]:.2f} °C")
    print(f"💧 Humidity: {prediction[3]:.2f} %")
    print(f"🌬 Windspeed: {prediction[4]:.2f} km/h")
    print(f"🌧 Precipitation: {prediction[5]:.2f} mm")
    print(f"🌥 Condition: {condition_decoded}")
    print(f"☔ Will it Rain?: {will_rain}")

except ValueError:
    print("❌ Invalid date format. Please use DD-MM-YYYY (e.g., 15-08-2025).")
