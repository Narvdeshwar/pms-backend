import { Request, Response, NextFunction } from "express";
import * as traceabilityService from "../services/traceability.service";
import {
    CreateLotRecordSchema,
    UpdateLotRecordSchema,
    CreateSerialRecordSchema,
    UpdateSerialRecordSchema,
    CreateTraceabilityRecordSchema
} from "../traceability.validation";

// Lot Controllers
export const getAllLots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lots = await traceabilityService.getAllLots();
        res.json(lots);
    } catch (error) {
        next(error);
    }
};

export const getLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lot = await traceabilityService.getLotById(req.params.id as string);
        if (!lot) return res.status(404).json({ message: "Lot not found" });
        res.json(lot);
    } catch (error) {
        next(error);
    }
};

export const createLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateLotRecordSchema.parse(req.body);
        const lot = await traceabilityService.createLot(validatedData);
        res.status(201).json(lot);
    } catch (error) {
        next(error);
    }
};

export const updateLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateLotRecordSchema.parse(req.body);
        const lot = await traceabilityService.updateLot(req.params.id as string, validatedData);
        res.json(lot);
    } catch (error) {
        next(error);
    }
};

export const deleteLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await traceabilityService.deleteLot(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Serial Controllers
export const getAllSerials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serials = await traceabilityService.getAllSerials();
        res.json(serials);
    } catch (error) {
        next(error);
    }
};

export const getSerial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serial = await traceabilityService.getSerialById(req.params.id as string);
        if (!serial) return res.status(404).json({ message: "Serial not found" });
        res.json(serial);
    } catch (error) {
        next(error);
    }
};

export const createSerial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateSerialRecordSchema.parse(req.body);
        const serial = await traceabilityService.createSerial(validatedData);
        res.status(201).json(serial);
    } catch (error) {
        next(error);
    }
};

export const updateSerial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateSerialRecordSchema.parse(req.body);
        const serial = await traceabilityService.updateSerial(req.params.id as string, validatedData);
        res.json(serial);
    } catch (error) {
        next(error);
    }
};

export const deleteSerial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await traceabilityService.deleteSerial(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Traceability Records
export const getTraceabilityRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await traceabilityService.getAllTraceabilityRecords(req.query);
        res.json(records);
    } catch (error) {
        next(error);
    }
};

export const createTraceabilityRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateTraceabilityRecordSchema.parse(req.body);
        const record = await traceabilityService.createTraceabilityRecord(validatedData);
        res.status(201).json(record);
    } catch (error) {
        next(error);
    }
};
