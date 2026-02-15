import { Request, Response, NextFunction } from "express";
import * as inventoryService from "../services/inventory.service";
import { CreateInventoryItemSchema, UpdateInventoryItemSchema, StockTransactionSchema } from "../inventory.validation";

export const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await inventoryService.getAllItems();
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await inventoryService.getItemById(req.params.id as string);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        next(error);
    }
};

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateInventoryItemSchema.parse(req.body);
        const item = await inventoryService.createItem(validatedData);
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateInventoryItemSchema.parse(req.body);
        const item = await inventoryService.updateItem(req.params.id as string, validatedData);
        res.json(item);
    } catch (error) {
        next(error);
    }
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await inventoryService.deleteItem(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = StockTransactionSchema.parse(req.body);
        const userId = (req as any).user.id;
        const transaction = await inventoryService.addTransaction(req.params.id as string, userId, validatedData);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};
