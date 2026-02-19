import { Request, Response, NextFunction } from "express";
import * as qualityService from "../services/quality.service";
import {
    CreateInspectionPlanSchema,
    UpdateInspectionPlanSchema,
    CreateInspectionRecordSchema,
    UpdateInspectionRecordSchema
} from "../quality.validation";

// Inspection Plan Controllers
export const getAllPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plans = await qualityService.getAllPlans();
        res.json(plans);
    } catch (error) {
        next(error);
    }
};

export const getPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plan = await qualityService.getPlanById(req.params.id as string);
        if (!plan) return res.status(404).json({ message: "Inspection plan not found" });
        res.json(plan);
    } catch (error) {
        next(error);
    }
};

export const createPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateInspectionPlanSchema.parse(req.body);
        const plan = await qualityService.createPlan(validatedData);
        res.status(201).json(plan);
    } catch (error) {
        next(error);
    }
};

export const updatePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateInspectionPlanSchema.parse(req.body);
        const plan = await qualityService.updatePlan(req.params.id as string, validatedData);
        res.json(plan);
    } catch (error) {
        next(error);
    }
};

export const deletePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await qualityService.deletePlan(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Inspection Record Controllers
export const getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await qualityService.getAllRecords();
        res.json(records);
    } catch (error) {
        next(error);
    }
};

export const getRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const record = await qualityService.getRecordById(req.params.id as string);
        if (!record) return res.status(404).json({ message: "Inspection record not found" });
        res.json(record);
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateInspectionRecordSchema.parse(req.body);
        const record = await qualityService.createRecord(validatedData);
        res.status(201).json(record);
    } catch (error) {
        next(error);
    }
};

export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateInspectionRecordSchema.parse(req.body);
        const record = await qualityService.updateRecord(req.params.id as string, validatedData);
        res.json(record);
    } catch (error) {
        next(error);
    }
};

export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await qualityService.deleteRecord(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
