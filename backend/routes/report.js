import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ws.id, u.username, ws.city, ws.weather_data, ws.created_at
      FROM weather_searches ws
      JOIN users u ON ws.user_id = u.id
      ORDER BY ws.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report' });
  }
});

export default router;

