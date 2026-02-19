import { z } from "zod";

export const CreateDocumentSchema = z.object({
    documentNumber: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    type: z.enum(['SOP', 'WORK_INSTRUCTION', 'QUALITY_MANUAL', 'SAFETY_PROCEDURE', 'TRAINING_MATERIAL']),
    status: z.enum(['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'OBSOLETE']).optional(),
    version: z.string().default("1.0"),
    department: z.string().min(1),
    owner: z.string().min(1),
    approver: z.string().optional(),
    effectiveDate: z.string().optional(),
    reviewDate: z.string().optional(),
    filePath: z.string().min(1),
    fileSize: z.number().int().positive(),
});

export const UpdateDocumentSchema = CreateDocumentSchema.partial();

export const CreateDocumentVersionSchema = z.object({
    documentId: z.string().min(1),
    version: z.string().min(1),
    changes: z.string().min(1),
    createdBy: z.string().min(1),
    filePath: z.string().min(1),
    status: z.enum(['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'OBSOLETE']).optional(),
});

export const CreateDocumentAccessSchema = z.object({
    documentId: z.string().min(1),
    userId: z.string().min(1),
    userName: z.string().min(1),
    accessType: z.enum(['View', 'Download', 'Print']),
    ipAddress: z.string().optional(),
});

export type CreateDocumentInput = z.infer<typeof CreateDocumentSchema>;
export type CreateDocumentVersionInput = z.infer<typeof CreateDocumentVersionSchema>;
export type CreateDocumentAccessInput = z.infer<typeof CreateDocumentAccessSchema>;
