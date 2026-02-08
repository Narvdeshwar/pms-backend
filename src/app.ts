import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler } from './shared/middleware';
import { authRoutes } from "./modules/auth";
import { userRoutes } from "./modules/user";
import { salesRoutes } from "./modules/sales";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sales', salesRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
