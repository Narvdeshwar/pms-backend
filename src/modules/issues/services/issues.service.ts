import { prisma } from "@/shared/db";
import { CreateIssueInput } from "../issues.validation";

export const getAllIssues = async () => {
    return await prisma.issue.findMany({
        orderBy: { updatedAt: 'desc' }
    });
};

export const getIssueById = async (id: string) => {
    return await prisma.issue.findUnique({
        where: { id }
    });
};

export const createIssue = async (data: CreateIssueInput) => {
    return await prisma.issue.create({
        data
    });
};

export const updateIssue = async (id: string, data: any) => {
    return await prisma.issue.update({
        where: { id },
        data
    });
};

export const deleteIssue = async (id: string) => {
    return await prisma.issue.delete({
        where: { id }
    });
};
