import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function RainfallChart() {
    const [rainfallData, setRainfallData] = React.useState({ dates: [], rainAmounts: [] });
    const [loading, setLoading] = React.useState(true); // State to manage loading status
    const [error, setError] = React.useState(null); // State to manage errors

    React.useEffect(() => {
        const fetchRainfallData = async () => {
            try {
                const res = await axios.get('/api/rainfall');
                setRainfallData(res.data); // Ensure this is structured correctly
                console.log(res.data);
            } catch (err) {
                setError(err); // Set error state if fetching fails
                console.error("Error fetching rainfall data:", err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchRainfallData();
    }, []);

    // Prepare the x-axis data only if data is loaded
    const xAxisData = rainfallData.dates.map(dateStr => new Date(dateStr).toISOString().split('T')[0]); // Format dates as YYYY-MM-DD

    // Prepare the series data only if data is loaded
    const seriesData = [
        { data: rainfallData.rainAmounts } // Use the rainfall amounts for the series
    ];

    // Handle loading and error states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: xAxisData }]} // Use formatted dates for the x-axis
            series={seriesData} // Use the rainfall amounts for the series
            width={500}
            height={300}
            title="Daily Rainfall"
        />
    );
}
