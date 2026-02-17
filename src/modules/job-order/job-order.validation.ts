import { z } from "zod";

export const CreateJobOrderSchema = z.object({
    jobId: z.string().optional(),
    client: z.string(),
    type: z.string(),
    category: z.string().optional(),
    status: z.string().optional(),
    salesperson: z.string().optional(),
    coordinator: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    startDate: z.string().optional(),
    deliveryDate: z.string().optional(),
    priority: z.string().optional(),
    progress: z.number().optional(),
    departments: z.array(z.any()).optional(),
    instructions: z.array(z.any()).optional(),
    timeline: z.array(z.any()).optional(),
    requiredMaterials: z.array(z.any()).optional(),
    departmentDetails: z.array(z.any()).optional(),
    departmentNames: z.array(z.string()).optional(),
    selectedTemplates: z.array(z.string()).optional(),
}).passthrough();

export type CreateJobOrderInput = z.infer<typeof CreateJobOrderSchema>;

export const UpdateJobOrderSchema = CreateJobOrderSchema.partial();
