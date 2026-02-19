import { Request, Response, NextFunction } from "express";
import * as analyticsService from "../services/analytics.service";
import { CreateAnalyticsSnapshotSchema } from "../analytics.validation";

export const getAllSnapshots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const snapshots = await analyticsService.getAllSnapshots(req.query);
        res.json(snapshots);
    } catch (error) {
        next(error);
    }
};

export const getSnapshot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const snapshot = await analyticsService.getSnapshotById(req.params.id as string);
        if (!snapshot) return res.status(404).json({ message: "Snapshot not found" });
        res.json(snapshot);
    } catch (error) {
        next(error);
    }
};

export const createSnapshot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateAnalyticsSnapshotSchema.parse(req.body);
        const snapshot = await analyticsService.createSnapshot(validatedData);
        res.status(201).json(snapshot);
    } catch (error) {
        next(error);
    }
};

export const getLatestSnapshot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const snapshot = await analyticsService.getLatestSnapshot();
        res.json(snapshot);
    } catch (error) {
        next(error);
    }
};

export const getTrends = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const days = req.query.days ? parseInt(req.query.days as string) : 7;
        const trends = await analyticsService.getAnalyticsTrends(days);
        res.json(trends);
    } catch (error) {
        next(error);
    }
};

export const getDepartmentEfficiency = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const efficiency = await analyticsService.getDepartmentEfficiency();
        res.json(efficiency);
    } catch (error) {
        next(error);
    }
};
