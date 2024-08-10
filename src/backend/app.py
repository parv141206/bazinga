from flask import Flask, jsonify, request
import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry
from flask_cors import CORS, cross_origin
app = Flask(__name__)

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after=-1)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

@app.route('/weather', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_weather_data():
    # Get parameters from the request
    latitude = request.args.get('latitude', type=float, default=52.52)
    longitude = request.args.get('longitude', type=float, default=13.41)
    start_date = request.args.get('start_date', type=str, default='2010-01-01')
    end_date = request.args.get('end_date', type=str, default='2019-12-31')

    # Define parameters for the Open Meteo API
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": ["soil_temperature_0_to_7cm", "soil_moisture_0_to_7cm"],
        "daily": "rain_sum"
    }

    # Fetch weather data from Open Meteo API
    try:
        responses = openmeteo.weather_api("https://archive-api.open-meteo.com/v1/archive", params=params)
        response = responses[0]

        # Process the response
        hourly = response.Hourly()
        hourly_soil_temperature_0_to_7cm = hourly.Variables(0).ValuesAsNumpy()
        hourly_soil_moisture_0_to_7cm = hourly.Variables(1).ValuesAsNumpy()

        hourly_data = {
            "date": pd.date_range(
                start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
                end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
                freq=pd.Timedelta(seconds=hourly.Interval()),
                inclusive="left"
            ),
            "soil_temperature_0_to_7cm": hourly_soil_temperature_0_to_7cm,
            "soil_moisture_0_to_7cm": hourly_soil_moisture_0_to_7cm
        }

        hourly_df = pd.DataFrame(data=hourly_data)

        # Filter hourly data to daily
        daily_soil_df = hourly_df.resample('D', on='date').mean()

        daily = response.Daily()
        daily_rain_sum = daily.Variables(0).ValuesAsNumpy()

        daily_data = {
            "date": pd.date_range(
                start=pd.to_datetime(daily.Time(), unit="s", utc=True),
                end=pd.to_datetime(daily.TimeEnd(), unit="s", utc=True),
                freq=pd.Timedelta(seconds=daily.Interval()),
                inclusive="left"
            ),
            "rain_sum": daily_rain_sum
        }

        daily_df = pd.DataFrame(data=daily_data)

        # Merge daily soil data with daily rain data
        daily_df = pd.merge(daily_df, daily_soil_df, on='date')

        # Convert to JSON
        return jsonify({
            "coordinates": {
                "latitude": response.Latitude(),
                "longitude": response.Longitude()
            },
            "elevation": response.Elevation(),
            "timezone": response.Timezone(),
            "timezone_offset": response.UtcOffsetSeconds(),
            "daily_data": daily_df.to_dict(orient='records')
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)