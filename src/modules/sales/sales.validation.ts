import { z } from "zod";

export const CreateOrderSchema = z.object({
    client: z.string().min(2, "Client name is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    quantity: z.number().int().positive().optional().or(z.literal("")).transform(v => v === "" ? undefined : v),
    deliveryDate: z.string().min(1, "Delivery date is required"),
    deliveryTime: z.string().optional(),
    priority: z.string().optional(),
    attachments: z.array(z.object({
        id: z.string().optional(),
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
    })).optional(),
});

export const UpdateOrderSchema = CreateOrderSchema.partial();

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;
