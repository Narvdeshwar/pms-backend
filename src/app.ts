import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(json());

// Main Route
app.get('/', (req, res) => {
  res.json({ message: 'PMS Backend API is running' });
});

// Create global error handler later
// app.use(errorHandler);

export default app;
