import { NextResponse } from 'next/server';
import { fetchWeatherApi } from 'openmeteo';

export async function GET() {
    const dates: Date[] = [];
    const rainAmounts: number[] = [];

    const params = {
        "latitude": 23.2232877,
        "longitude": 72.6492267,
        "start_date": "2024-07-01",
        "end_date": "2024-08-09",
        "hourly": ["temperature_2m", "rain"],
        "daily": "rain_sum",
        "timezone": "Asia/Bangkok"
    };
    const url = "https://archive-api.open-meteo.com/v1/archive";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Extract daily data
    const dailyTimes = range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
    );
    const rainSums = daily.variables(0)!.valuesArray()!;

    // Populate dates and rain amounts arrays
    for (let i = 0; i < dailyTimes.length; i++) {
        if (rainSums[i] > 0) {
            dates.push(dailyTimes[i]);
            rainAmounts.push(rainSums[i]);
        }
    }

    // Log the results for debugging
    console.table({ dates, rainAmounts });

    // Return both arrays as a JSON response
    return NextResponse.json({ dates, rainAmounts });
}
