from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__, template_folder='.')

@app.route('/')
def home():
    return render_template('predict.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        date = request.form['date']
        # ✨ Replace with your actual prediction logic here
        prediction = {
            "date": date,
            "temp": 28,
            "tempmax": 32,
            "tempmin": 25,
            "humidity": 70,
            "windspeed": 15,
            "precip": 2,
            "condition": "Partly cloudy",
            "will_rain": "No"
        }
        return render_template('predict.html', prediction=prediction)
    return render_template('predict.html', prediction=None)

if __name__ == '__main__':
    app.run(debug=True)
