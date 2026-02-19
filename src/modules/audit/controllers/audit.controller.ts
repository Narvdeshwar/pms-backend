import { Request, Response, NextFunction } from "express";
import * as auditService from "../services/audit.service";
import { CreateAuditLogSchema } from "../audit.validation";

export const getAllAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await auditService.getAllAuditLogs(req.query);
        res.json(logs);
    } catch (error) {
        next(error);
    }
};

export const getAuditLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const log = await auditService.getAuditLogById(req.params.id as string);
        if (!log) return res.status(404).json({ message: "Audit log not found" });
        res.json(log);
    } catch (error) {
        next(error);
    }
};

export const createAuditLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateAuditLogSchema.parse(req.body);
        const log = await auditService.createAuditLog(validatedData);
        res.status(201).json(log);
    } catch (error) {
        next(error);
    }
};

export const getAuditStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await auditService.getAuditStats();
        res.json(stats);
    } catch (error) {
        next(error);
    }
};
