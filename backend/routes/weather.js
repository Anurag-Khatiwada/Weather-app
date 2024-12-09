import express from 'express';
import axios from 'axios';
import { pool } from '../db.js';

const router = express.Router();

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  const userId = req.user.id;

  try {
    const weatherResponse = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: process.env.WEATHERSTACK_API_KEY,
        query: city
      }
    });

    const weatherData = weatherResponse.data;

    // Save the search to the database
    await pool.query(
      'INSERT INTO weather_searches (user_id, city, weather_data) VALUES ($1, $2, $3)',
      [userId, city, JSON.stringify(weatherData)]
    );

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

export default router;

