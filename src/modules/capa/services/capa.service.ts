import { prisma } from "@/shared/db";
import { CreateCAPAInput, CreateCAPAActionInput } from "../capa.validation";

// CAPA
export const getAllCAPAs = async () => {
    return await prisma.cAPA.findMany({
        include: {
            actions: true
        },
        orderBy: { updatedAt: 'desc' }
    });
};

export const getCAPAById = async (id: string) => {
    return await prisma.cAPA.findUnique({
        where: { id },
        include: {
            actions: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });
};

export const createCAPA = async (data: CreateCAPAInput) => {
    const {
        targetDate,
        actualDate,
        verificationDate,
        effectivenessDate,
        attachments,
        ...rest
    } = data;

    return await prisma.cAPA.create({
        data: {
            ...rest,
            targetDate: new Date(targetDate),
            actualDate: actualDate ? new Date(actualDate) : null,
            verificationDate: verificationDate ? new Date(verificationDate) : null,
            effectivenessDate: effectivenessDate ? new Date(effectivenessDate) : null,
            attachments: attachments || [],
        }
    });
};

export const updateCAPA = async (id: string, data: any) => {
    const updateData = { ...data };
    if (updateData.targetDate) updateData.targetDate = new Date(updateData.targetDate);
    if (updateData.actualDate) updateData.actualDate = new Date(updateData.actualDate);
    if (updateData.verificationDate) updateData.verificationDate = new Date(updateData.verificationDate);
    if (updateData.effectivenessDate) updateData.effectivenessDate = new Date(updateData.effectivenessDate);

    return await prisma.cAPA.update({
        where: { id },
        data: updateData
    });
};

export const deleteCAPA = async (id: string) => {
    return await prisma.cAPA.delete({
        where: { id }
    });
};

// CAPA Actions
export const createCAPAAction = async (data: CreateCAPAActionInput) => {
    const { dueDate, completedDate, ...rest } = data;

    return await prisma.cAPAAction.create({
        data: {
            ...rest,
            dueDate: new Date(dueDate),
            completedDate: completedDate ? new Date(completedDate) : null,
        }
    });
};

export const getCAPAActions = async (capaId: string) => {
    return await prisma.cAPAAction.findMany({
        where: { capaId },
        orderBy: { createdAt: 'desc' }
    });
};

export const updateCAPAAction = async (id: string, data: any) => {
    const updateData = { ...data };
    if (updateData.dueDate) updateData.dueDate = new Date(updateData.dueDate);
    if (updateData.completedDate) updateData.completedDate = new Date(updateData.completedDate);

    return await prisma.cAPAAction.update({
        where: { id },
        data: updateData
    });
};

export const deleteCAPAAction = async (id: string) => {
    return await prisma.cAPAAction.delete({
        where: { id }
    });
};
