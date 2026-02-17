import { prisma } from "@/shared/db";

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        include: {
            role: true
        }
    });
};

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            role: true
        }
    });
};

export const updateUser = async (userId: string, data: { roleId?: string, departmentId?: string }) => {
    if (data.roleId) {
        // Check if role exists
        const role = await prisma.role.findUnique({ where: { id: data.roleId } });
        if (!role) throw new Error("Role not found");
    }

    return await prisma.user.update({
        where: { id: userId },
        data,
        include: {
            role: true
        }
    });
};

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id }
    });
};

export const getAllRoles = async () => {
    return await prisma.role.findMany();
};
