import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import { errorHandler } from './shared/middleware/errorHandler';
import authRoutes from "./modules/auth/routes/auth.routes"

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(json());

app.use('/api/v1/auth', authRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
