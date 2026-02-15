import { prisma } from "@/shared/db";

export const getAllDepartments = async () => {
    return await prisma.department.findMany({
        include: {
            _count: {
                select: { users: true }
            }
        }
    });
};

export const getDepartmentById = async (id: string) => {
    return await prisma.department.findUnique({
        where: { id },
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    });
};

export const createDepartment = async (data: { name: string; code: string; workers: number; benchmarkTime?: string }) => {
    return await prisma.department.create({
        data
    });
};

export const updateDepartment = async (id: string, data: { name?: string; code?: string; workers?: number; benchmarkTime?: string }) => {
    return await prisma.department.update({
        where: { id },
        data
    });
};

export const deleteDepartment = async (id: string) => {
    return await prisma.department.delete({
        where: { id }
    });
};
