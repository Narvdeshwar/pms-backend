import { prisma } from "@/shared/db";
import { CreateJobOrderInput } from "../job-order.validation";

export const getJobOrders = async () => {
    return await prisma.jobOrder.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const getJobOrderById = async (id: string) => {
    return await prisma.jobOrder.findUnique({
        where: { id },
    });
};

export const createJobOrder = async (input: CreateJobOrderInput) => {
    const { startDate, deliveryDate, ...rest } = input;

    return await prisma.jobOrder.create({
        data: {
            ...rest,
            status: input.status || "Draft",
            jobId: input.jobId || `JOB-${Date.now()}`,
            startDate: startDate ? new Date(startDate) : null,
            deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
            departments: input.departments as any,
            instructions: input.instructions as any,
            timeline: input.timeline as any,
            requiredMaterials: input.requiredMaterials as any,
        },
    });
};

export const updateJobOrder = async (id: string, input: any) => {
    const data = { ...input };
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.deliveryDate) data.deliveryDate = new Date(data.deliveryDate);

    return await prisma.jobOrder.update({
        where: { id },
        data,
    });
};

export const deleteJobOrder = async (id: string) => {
    return await prisma.jobOrder.delete({
        where: { id },
    });
};
