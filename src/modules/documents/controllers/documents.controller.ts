import { Request, Response, NextFunction } from "express";
import * as documentsService from "../services/documents.service";
import {
    CreateDocumentSchema,
    UpdateDocumentSchema,
    CreateDocumentVersionSchema,
    CreateDocumentAccessSchema
} from "../documents.validation";

// Document Controllers
export const getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const documents = await documentsService.getAllDocuments();
        res.json(documents);
    } catch (error) {
        next(error);
    }
};

export const getDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const document = await documentsService.getDocumentById(req.params.id as string);
        if (!document) return res.status(404).json({ message: "Document not found" });
        res.json(document);
    } catch (error) {
        next(error);
    }
};

export const createDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateDocumentSchema.parse(req.body);
        const document = await documentsService.createDocument(validatedData);
        res.status(201).json(document);
    } catch (error) {
        next(error);
    }
};

export const updateDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateDocumentSchema.parse(req.body);
        const document = await documentsService.updateDocument(req.params.id as string, validatedData);
        res.json(document);
    } catch (error) {
        next(error);
    }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await documentsService.deleteDocument(req.params.id as string);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Version Controllers
export const createVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateDocumentVersionSchema.parse(req.body);
        const version = await documentsService.createDocumentVersion(validatedData);
        res.status(201).json(version);
    } catch (error) {
        next(error);
    }
};

export const getVersions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const versions = await documentsService.getDocumentVersions(req.params.id as string);
        res.json(versions);
    } catch (error) {
        next(error);
    }
};

// Access Log Controllers
export const logAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateDocumentAccessSchema.parse(req.body);
        const log = await documentsService.logDocumentAccess(validatedData);
        res.status(201).json(log);
    } catch (error) {
        next(error);
    }
};

export const getAccessLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const logs = await documentsService.getDocumentAccessLogs(req.params.id as string);
        res.json(logs);
    } catch (error) {
        next(error);
    }
};
