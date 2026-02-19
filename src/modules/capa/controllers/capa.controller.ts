import { Request, Response, NextFunction } from "express";
import * as capaService from "../services/capa.service";
import {
    CreateCAPASchema,
    UpdateCAPASchema,
    CreateCAPAActionSchema,
    UpdateCAPAActionSchema
} from "../capa.validation";

// CAPA Controllers
export const getAllCAPAs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const capas = await capaService.getAllCAPAs();
        res.json(capas);
    } catch (error) {
        next(error);
    }
};

export const getCAPA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const capa = await capaService.getCAPAById(req.params.id as string);
        if (!capa) return res.status(404).json({ message: "CAPA not found" });
        res.json(capa);
    } catch (error) {
        next(error);
    }
};

export const createCAPA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateCAPASchema.parse(req.body);
        const capa = await capaService.createCAPA(validatedData);
        res.status(201).json(capa);
    } catch (error) {
        next(error);
    }
};

export const updateCAPA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateCAPASchema.parse(req.body);
        const capa = await capaService.updateCAPA(req.params.id as string, validatedData);
        res.json(capa);
    } catch (error) {
        next(error);
    }
};

export const deleteCAPA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await capaService.deleteCAPA(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// CAPA Action Controllers
export const createAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateCAPAActionSchema.parse(req.body);
        const action = await capaService.createCAPAAction(validatedData);
        res.status(201).json(action);
    } catch (error) {
        next(error);
    }
};

export const getActions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const actions = await capaService.getCAPAActions(req.params.id as string);
        res.json(actions);
    } catch (error) {
        next(error);
    }
};

export const updateAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateCAPAActionSchema.parse(req.body);
        const action = await capaService.updateCAPAAction(req.params.actionId as string, validatedData);
        res.json(action);
    } catch (error) {
        next(error);
    }
};

export const deleteAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await capaService.deleteCAPAAction(req.params.actionId as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
