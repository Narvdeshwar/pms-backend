import { Request, Response, NextFunction } from "express";
import * as departmentsService from "../services/departments.service";

export const getAllDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departments = await departmentsService.getAllDepartments();
        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};

export const getDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const department = await departmentsService.getDepartmentById(req.params.id as string);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        next(error);
    }
};

export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const department = await departmentsService.createDepartment(req.body);
        res.status(201).json(department);
    } catch (error) {
        next(error);
    }
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const department = await departmentsService.updateDepartment(req.params.id as string, req.body);
        res.status(200).json(department);
    } catch (error) {
        next(error);
    }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await departmentsService.deleteDepartment(req.params.id as string);
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        next(error);
    }
};
