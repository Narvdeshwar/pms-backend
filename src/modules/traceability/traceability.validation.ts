import { z } from "zod";

export const CreateLotRecordSchema = z.object({
    lotNumber: z.string().min(1),
    itemId: z.string().min(1),
    itemName: z.string().min(1),
    quantity: z.number().positive(),
    unitOfMeasure: z.string().min(1),
    manufacturingDate: z.string(),
    expiryDate: z.string().optional(),
    supplierId: z.string().optional(),
    supplierLotNumber: z.string().optional(),
    status: z.enum(['ACTIVE', 'CONSUMED', 'QUARANTINED', 'EXPIRED']).optional(),
    location: z.string().min(1),
});

export const UpdateLotRecordSchema = CreateLotRecordSchema.partial();

export const CreateSerialRecordSchema = z.object({
    serialNumber: z.string().min(1),
    itemId: z.string().min(1),
    itemName: z.string().min(1),
    lotId: z.string().optional(),
    status: z.enum(['AVAILABLE', 'IN_USE', 'CONSUMED', 'DEFECTIVE', 'RETURNED']).optional(),
    manufacturingDate: z.string(),
    location: z.string().min(1),
    currentJobId: z.string().optional(),
});

export const UpdateSerialRecordSchema = CreateSerialRecordSchema.partial();

export const CreateTraceabilityRecordSchema = z.object({
    type: z.enum(['Lot', 'Serial']),
    referenceId: z.string().min(1),
    jobId: z.string().optional(),
    operationId: z.string().optional(),
    workstationId: z.string().optional(),
    operatorId: z.string().optional(),
    action: z.enum(['Created', 'Issued', 'Consumed', 'Moved', 'Inspected', 'Reworked', 'Scrapped']),
    fromLocation: z.string().optional(),
    toLocation: z.string().optional(),
    quantity: z.number().optional(),
    notes: z.string().optional(),
});

export type CreateLotRecordInput = z.infer<typeof CreateLotRecordSchema>;
export type CreateSerialRecordInput = z.infer<typeof CreateSerialRecordSchema>;
export type CreateTraceabilityRecordInput = z.infer<typeof CreateTraceabilityRecordSchema>;
