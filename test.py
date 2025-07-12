import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
import joblib

# === 1. Load Dataset ===
df = pd.read_csv("kollam_weather.csv")  # Make sure the CSV is in the same directory or provide full path

# === 2. Parse Dates ===
df['datetime'] = pd.to_datetime(df['datetime'], errors='coerce')
df['year'] = df['datetime'].dt.year
df['month'] = df['datetime'].dt.month
df['day'] = df['datetime'].dt.day
df['dayofweek'] = df['datetime'].dt.dayofweek

# === 3. Target: will_rain from 'conditions' ===
df['will_rain'] = df['conditions'].str.contains('Rain', case=False, na=False).astype(int)

# === 4. Select Features and Targets ===
X_all = df[['year', 'month', 'day', 'dayofweek']]
y_all = df[['temp', 'tempmax', 'tempmin', 'humidity', 'windspeed', 'precip', 'will_rain']]

# Drop missing rows
data = pd.concat([X_all, y_all], axis=1).dropna()
X = data[X_all.columns]
y = data[y_all.columns]

# === 5. Train the Model ===
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))
model.fit(X_train, y_train)

# === 6. Save the Model ===
joblib.dump(model, "weather_model.pkl")
print("✅ Model has been trained and saved as 'weather_model.pkl'")
