import { z } from "zod";

export const CreateInventoryItemSchema = z.object({
    sku: z.string().min(1, "SKU is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    type: z.enum(["raw_material", "wip", "finished_good", "consumable"]),
    unitOfMeasure: z.string().min(1, "Unit of measure is required"),
    minimumStockLevel: z.number().optional().default(0),
    reorderPoint: z.number().optional().default(0),
    currentStock: z.number().optional().default(0),
    status: z.enum(["active", "inactive"]).optional().default("active"),
    location: z.string().optional(),
    supplier: z.string().optional(),
    purchaseOrderNumber: z.string().optional(),
    purchaseDate: z.string().optional().nullable(),
    batchNumber: z.string().optional(),
    expiryDate: z.string().optional().nullable(),
    unitPrice: z.number().optional(),
});

export type CreateInventoryItemInput = z.infer<typeof CreateInventoryItemSchema>;

export const UpdateInventoryItemSchema = CreateInventoryItemSchema.partial();

export const StockTransactionSchema = z.object({
    type: z.enum(["in", "out", "adjustment"]),
    quantity: z.number().gt(0, "Quantity must be greater than 0"),
    referenceType: z.enum(["purchase_order", "work_order", "sales_order", "manual"]),
    referenceId: z.string().optional(),
    notes: z.string().optional(),
});
