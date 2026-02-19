import { z } from "zod";

export const CreateJobOrderSchema = z.object({
    jobId: z.string().optional(),
    client: z.string(),
    type: z.string(),
    category: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    salesperson: z.union([z.string(), z.array(z.string())]).optional().nullable(),
    coordinator: z.union([z.string(), z.array(z.string())]).optional().nullable(),
    description: z.string().optional().nullable(),
    quantity: z.number().optional().nullable(),
    startDate: z.string().optional().nullable(),
    deliveryDate: z.string().optional().nullable(),
    startTime: z.string().optional().nullable(),
    deliveryTime: z.string().optional().nullable(),
    priority: z.string().optional().nullable(),
    progress: z.number().optional().nullable(),
    departments: z.array(z.any()).optional().nullable(),
    instructions: z.array(z.any()).optional().nullable(),
    timeline: z.array(z.any()).optional().nullable(),
    requiredMaterials: z.array(z.any()).optional().nullable(),
    departmentDetails: z.array(z.any()).optional().nullable(),
    departmentNames: z.array(z.string()).optional().nullable(),
    selectedTemplates: z.array(z.string()).optional().nullable(),
    projects: z.array(z.string()).optional().nullable(),
    attachments: z.array(z.any()).optional().nullable(),
}).passthrough();

export type CreateJobOrderInput = z.infer<typeof CreateJobOrderSchema>;

export const UpdateJobOrderSchema = CreateJobOrderSchema.partial();
