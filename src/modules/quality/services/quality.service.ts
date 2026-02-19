import { prisma } from "@/shared/db";
import {
    CreateInspectionPlanInput,
    UpdateInspectionPlanInput,
    CreateInspectionRecordInput,
    UpdateInspectionRecordInput
} from "../quality.validation";

// Inspection Plans
export const getAllPlans = async () => {
    return await prisma.inspectionPlan.findMany({
        orderBy: { updatedAt: 'desc' }
    });
};

export const getPlanById = async (id: string) => {
    return await prisma.inspectionPlan.findUnique({
        where: { id },
        include: {
            records: {
                orderBy: { date: 'desc' },
                take: 10
            }
        }
    });
};

export const createPlan = async (data: CreateInspectionPlanInput) => {
    return await prisma.inspectionPlan.create({
        data
    });
};

export const updatePlan = async (id: string, data: UpdateInspectionPlanInput) => {
    return await prisma.inspectionPlan.update({
        where: { id },
        data
    });
};

export const deletePlan = async (id: string) => {
    return await prisma.inspectionPlan.delete({
        where: { id }
    });
};

// Inspection Records
export const getAllRecords = async () => {
    return await prisma.inspectionRecord.findMany({
        orderBy: { date: 'desc' }
    });
};

export const getRecordById = async (id: string) => {
    return await prisma.inspectionRecord.findUnique({
        where: { id },
        include: {
            plan: true
        }
    });
};

export const createRecord = async (data: CreateInspectionRecordInput) => {
    const { date, ...rest } = data;
    return await prisma.inspectionRecord.create({
        data: {
            ...rest,
            date: new Date(date),
        }
    });
};

export const updateRecord = async (id: string, data: UpdateInspectionRecordInput) => {
    const updateData: any = { ...data };
    if (updateData.date) updateData.date = new Date(updateData.date);

    return await prisma.inspectionRecord.update({
        where: { id },
        data: updateData
    });
};

export const deleteRecord = async (id: string) => {
    return await prisma.inspectionRecord.delete({
        where: { id }
    });
};
