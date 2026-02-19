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
import { traceabilityRoutes } from "./modules/traceability";
import { documentsRoutes } from "./modules/documents";
import { capaRoutes } from "./modules/capa";
import { qualityRoutes } from "./modules/quality";
import { auditRoutes } from "./modules/audit";
import { analyticsRoutes } from "./modules/analytics";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(json());
app.use(cookieParser());

// Existing routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/job-orders', jobOrderRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/issues', issueRoutes);

// New routes
app.use('/api/v1/traceability', traceabilityRoutes);
app.use('/api/v1/documents', documentsRoutes);
app.use('/api/v1/capa', capaRoutes);
app.use('/api/v1/quality', qualityRoutes);
app.use('/api/v1/audit', auditRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
