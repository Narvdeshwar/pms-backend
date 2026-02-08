import { prisma } from "@/shared/db";
import { CreateOrderInput } from "../sales.validation";

export const createOrder = async (input: CreateOrderInput, salesPersonId: string) => {
    // Generate a simple order number (e.g., ORD-timestamp)
    const orderNumber = `ORD-${Date.now()}`;

    // Map priority strings if they differ (Frontend often uses "Medium" instead of "MEDIUM")
    const priority = (input.priority?.toUpperCase() as any) || "MEDIUM";

    return await prisma.order.create({
        data: {
            orderNumber,
            customerName: input.client,
            category: input.category,
            quantity: input.quantity,
            priority: priority,
            deliveryDate: new Date(input.deliveryDate),
            deliveryTime: input.deliveryTime,
            notes: input.description,
            salesPersonId,
            attachments: {
                create: input.attachments?.map(att => ({
                    name: att.name,
                    url: att.url,
                    type: att.type,
                    size: att.size
                })) || []
            }
        },
        include: {
            salesPerson: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            attachments: true
        }
    });
};

export const getSalesOrders = async (salesPersonId?: string) => {
    const where = salesPersonId ? { salesPersonId } : {};
    return await prisma.order.findMany({
        where,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            salesPerson: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            attachments: true
        }
    });
};
