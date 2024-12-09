import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import weatherRoutes from './routes/weather.js';
import reportRoutes from './routes/report.js';
import { verifyToken } from './middleware/auth.js';
import { setupDatabase } from './db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/weather', verifyToken, weatherRoutes);
app.use('/api/report', verifyToken, reportRoutes);

const PORT = process.env.PORT || 5000;

setupDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => {
  console.error('Failed to set up database:', error);
  process.exit(1);
});

