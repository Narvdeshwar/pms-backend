import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler } from './shared/middleware';
import { authRoutes } from "./modules/auth";
import { userRoutes } from "./modules/user";
import { salesRoutes } from "./modules/sales";
import { jobOrderRoutes } from "./modules/job-order";
import { dashboardRoutes } from "./modules/dashboard";
import { departmentRoutes } from "./modules/departments";
import { inventoryRoutes } from "./modules/inventory";
import { issueRoutes } from "./modules/issues";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/job-orders', jobOrderRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/issues', issueRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
