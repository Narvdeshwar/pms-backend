import { prisma } from "@/shared/db";
import { CreateInventoryItemInput } from "../inventory.validation";

export const getAllItems = async () => {
    return await prisma.inventoryItem.findMany({
        include: {
            _count: {
                select: { transactions: true }
            }
        },
        orderBy: { updatedAt: 'desc' }
    });
};

export const getItemById = async (id: string) => {
    return await prisma.inventoryItem.findUnique({
        where: { id },
        include: {
            transactions: {
                take: 10,
                orderBy: { timestamp: 'desc' }
            }
        }
    });
};

export const createItem = async (data: CreateInventoryItemInput) => {
    const { purchaseDate, expiryDate, ...rest } = data;
    return await prisma.inventoryItem.create({
        data: {
            ...rest,
            purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
            expiryDate: expiryDate ? new Date(expiryDate) : null,
        }
    });
};

export const updateItem = async (id: string, data: any) => {
    const updateData = { ...data };
    if (updateData.purchaseDate) updateData.purchaseDate = new Date(updateData.purchaseDate);
    if (updateData.expiryDate) updateData.expiryDate = new Date(updateData.expiryDate);

    return await prisma.inventoryItem.update({
        where: { id },
        data: updateData
    });
};

export const deleteItem = async (id: string) => {
    return await prisma.inventoryItem.delete({
        where: { id }
    });
};

export const addTransaction = async (itemId: string, userId: string, data: {
    type: string;
    quantity: number;
    referenceType: string;
    referenceId?: string;
    notes?: string;
}) => {
    return await prisma.$transaction(async (tx) => {
        // 1. Create the transaction record
        const transaction = await tx.stockTransaction.create({
            data: {
                itemId,
                performedBy: userId,
                ...data
            }
        });

        // 2. Update current stock in InventoryItem
        const quantityChange = data.type === 'in' ? data.quantity : -data.quantity;

        await tx.inventoryItem.update({
            where: { id: itemId },
            data: {
                currentStock: {
                    increment: quantityChange
                }
            }
        });

        return transaction;
    });
};
