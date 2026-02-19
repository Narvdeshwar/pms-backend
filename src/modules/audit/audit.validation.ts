import { z } from "zod";

export const CreateAuditLogSchema = z.object({
    userId: z.string().min(1),
    userName: z.string().min(1),
    action: z.string().min(1), // Login, Create, Update, Delete, Approve, etc.
    resource: z.string().min(1), // JobOrder, Inventory, Quality, etc.
    resourceId: z.string().optional(),
    details: z.any().optional(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    status: z.enum(['success', 'failure']).optional(),
});

export type CreateAuditLogInput = z.infer<typeof CreateAuditLogSchema>;
