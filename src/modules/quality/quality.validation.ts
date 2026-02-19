import { z } from "zod";

export const CreateInspectionPlanSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(['RECEIVING', 'IN_PROCESS', 'FINAL', 'MAINTENANCE']),
    department: z.string().min(1, "Department is required"),
    items: z.array(z.any()), // Array of InspectionCheckItem
    active: z.boolean().optional().default(true),
});

export const UpdateInspectionPlanSchema = CreateInspectionPlanSchema.partial();

export const CreateInspectionRecordSchema = z.object({
    planId: z.string().min(1, "Plan ID is required"),
    planName: z.string().min(1, "Plan Name is required"),
    jobId: z.string().optional().nullable(),
    itemId: z.string().optional().nullable(),
    inspectorName: z.string().min(1, "Inspector Name is required"),
    date: z.string(),
    status: z.enum(['PASS', 'FAIL', 'CONDITIONAL']),
    results: z.array(z.any()), // Array of InspectionResultItem
    overallNotes: z.string().optional().nullable(),
});

export const UpdateInspectionRecordSchema = CreateInspectionRecordSchema.partial();

export type CreateInspectionPlanInput = z.infer<typeof CreateInspectionPlanSchema>;
export type UpdateInspectionPlanInput = z.infer<typeof UpdateInspectionPlanSchema>;
export type CreateInspectionRecordInput = z.infer<typeof CreateInspectionRecordSchema>;
export type UpdateInspectionRecordInput = z.infer<typeof UpdateInspectionRecordSchema>;
