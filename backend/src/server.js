import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { photoRoutes } from './routes/photoRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'business-photo-backend' });
});

app.use('/api/photos', photoRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
