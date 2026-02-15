import { Request, Response, NextFunction } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await dashboardService.getStats();
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

export const getRecentActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activity = await dashboardService.getRecentActivity();
        res.status(200).json(activity);
    } catch (error) {
        next(error);
    }
};
