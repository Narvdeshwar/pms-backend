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

export const createJobOrder = async (input: any) => {
    const {
        startDate,
        deliveryDate,
        salesperson,
        coordinator,
        departmentDetails,
        created, // Exclude legacy frontend fields
        delivery, // Exclude legacy frontend fields
        ...rest
    } = input;

    const data: any = {
        ...rest,
        status: input.status || "Draft",
        jobId: input.jobId || `JOB-${Date.now()}`,
        startDate: startDate ? new Date(startDate) : null,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        salesperson: Array.isArray(salesperson) ? salesperson.join(", ") : salesperson,
        coordinator: Array.isArray(coordinator) ? coordinator.join(", ") : coordinator,
        departments: departmentDetails || input.departments || [],
        instructions: input.instructions || [],
        timeline: input.timeline || [],
        requiredMaterials: input.requiredMaterials || [],
        selectedTemplates: input.selectedTemplates || [],
        projects: input.projects || [],
        attachments: input.attachments || [],
    };

    // Filter to only include fields that exist in the Prisma schema
    const schemaFields = [
        'jobId', 'client', 'type', 'category', 'status', 'salesperson',
        'coordinator', 'description', 'quantity', 'startDate', 'deliveryDate',
        'startTime', 'deliveryTime', 'priority', 'progress', 'departments',
        'instructions', 'timeline', 'requiredMaterials', 'selectedTemplates',
        'projects', 'attachments'
    ];

    const filteredData: any = {};
    Object.keys(data).forEach(key => {
        if (schemaFields.includes(key) && data[key] !== undefined) {
            filteredData[key] = data[key];
        }
    });

    return await prisma.jobOrder.create({
        data: filteredData,
    });
};

export const updateJobOrder = async (id: string, input: any) => {
    const { startDate, deliveryDate, salesperson, coordinator, departmentDetails, ...rest } = input;

    const data: any = {
        ...rest,
        startDate: startDate ? new Date(startDate) : undefined,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
        salesperson: Array.isArray(salesperson) ? salesperson.join(", ") : salesperson,
        coordinator: Array.isArray(coordinator) ? coordinator.join(", ") : coordinator,
        departments: departmentDetails || rest.departments,
    };

    // Filter to only include fields that exist in the Prisma schema
    const schemaFields = [
        'jobId', 'client', 'type', 'category', 'status', 'salesperson',
        'coordinator', 'description', 'quantity', 'startDate', 'deliveryDate',
        'startTime', 'deliveryTime', 'priority', 'progress', 'departments',
        'instructions', 'timeline', 'requiredMaterials', 'selectedTemplates',
        'projects', 'attachments'
    ];

    const filteredData: any = {};
    Object.keys(data).forEach(key => {
        if (schemaFields.includes(key) && data[key] !== undefined) {
            filteredData[key] = data[key];
        }
    });

    return await prisma.jobOrder.update({
        where: { id },
        data: filteredData,
    });
};

export const deleteJobOrder = async (id: string) => {
    return await prisma.jobOrder.delete({
        where: { id },
    });
};
