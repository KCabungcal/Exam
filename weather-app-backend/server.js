const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
const apiKey = 'YhdGqLyxb9o4kYTt2S34x9CGebSpHCX6'; // Replace with your actual API key

app.use(cors());
app.use(express.json());

// Endpoint to search for cities
app.get('/api/cities', async (req, res) => {
    const { q } = req.query;
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${q}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching city data:', error);
        res.status(500).json({ error: 'Error fetching city data' });
    }
});

// Endpoint to get current weather
app.get('/api/weather/:locationKey', async (req, res) => {
    const { locationKey } = req.params;
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Endpoint to get hourly forecast
app.get('/api/hourly/:locationKey', async (req, res) => {
    const { locationKey } = req.params;
    const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching hourly forecast data:', error);
        res.status(500).json({ error: 'Error fetching hourly forecast data' });
    }
});

// Endpoint to get weekly forecast
app.get('/api/weekly/:locationKey', async (req, res) => {
    const { locationKey } = req.params;
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weekly forecast data:', error);
        res.status(500).json({ error: 'Error fetching weekly forecast data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
