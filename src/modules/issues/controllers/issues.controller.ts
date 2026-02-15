import { Request, Response, NextFunction } from "express";
import * as issuesService from "../services/issues.service";
import { CreateIssueSchema, UpdateIssueSchema } from "../issues.validation";

export const getAllIssues = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issues = await issuesService.getAllIssues();
        res.json(issues);
    } catch (error) {
        next(error);
    }
};

export const getIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issue = await issuesService.getIssueById(req.params.id as string);
        if (!issue) return res.status(404).json({ message: "Issue not found" });
        res.json(issue);
    } catch (error) {
        next(error);
    }
};

export const createIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateIssueSchema.parse(req.body);
        const issue = await issuesService.createIssue(validatedData);
        res.status(201).json(issue);
    } catch (error) {
        next(error);
    }
};

export const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateIssueSchema.parse(req.body);
        const issue = await issuesService.updateIssue(req.params.id as string, validatedData);
        res.json(issue);
    } catch (error) {
        next(error);
    }
};

export const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await issuesService.deleteIssue(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
