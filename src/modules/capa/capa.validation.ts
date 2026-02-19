import { z } from "zod";

export const CreateCAPASchema = z.object({
    capaNumber: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['CORRECTIVE_ACTION', 'PREVENTIVE_ACTION', 'BOTH']),
    source: z.enum(['CUSTOMER_COMPLAINT', 'INTERNAL_AUDIT', 'QUALITY_ISSUE', 'SAFETY_INCIDENT', 'PROCESS_DEVIATION', 'SUPPLIER_ISSUE']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'UNDER_REVIEW', 'CLOSED', 'CANCELLED']).optional(),
    initiatedBy: z.string().min(1),
    assignedTo: z.string().min(1),
    department: z.string().min(1),
    rootCause: z.string().optional(),
    correctiveAction: z.string().optional(),
    preventiveAction: z.string().optional(),
    targetDate: z.string(),
    actualDate: z.string().optional(),
    verificationMethod: z.string().optional(),
    verificationDate: z.string().optional(),
    verifiedBy: z.string().optional(),
    effectivenessReview: z.string().optional(),
    effectivenessDate: z.string().optional(),
    relatedJobId: z.string().optional(),
    relatedLotId: z.string().optional(),
    attachments: z.array(z.string()).optional(),
});

export const UpdateCAPASchema = CreateCAPASchema.partial();

export const CreateCAPAActionSchema = z.object({
    capaId: z.string().min(1),
    actionType: z.enum(['INVESTIGATION', 'IMPLEMENTATION', 'VERIFICATION', 'REVIEW']),
    description: z.string().min(1),
    assignedTo: z.string().min(1),
    dueDate: z.string(),
    completedDate: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE']).optional(),
    notes: z.string().optional(),
});

export const UpdateCAPAActionSchema = CreateCAPAActionSchema.partial();

export type CreateCAPAInput = z.infer<typeof CreateCAPASchema>;
export type CreateCAPAActionInput = z.infer<typeof CreateCAPAActionSchema>;
