import { prisma } from "@/shared/db";
import { CreateDocumentInput, CreateDocumentVersionInput, CreateDocumentAccessInput } from "../documents.validation";

// Documents
export const getAllDocuments = async () => {
    return await prisma.document.findMany({
        orderBy: { updatedAt: 'desc' }
    });
};

export const getDocumentById = async (id: string) => {
    return await prisma.document.findUnique({
        where: { id },
        include: {
            versions: {
                orderBy: { createdAt: 'desc' }
            },
            accessLogs: {
                orderBy: { timestamp: 'desc' },
                take: 20
            }
        }
    });
};

export const createDocument = async (data: CreateDocumentInput) => {
    const { effectiveDate, reviewDate, ...rest } = data;
    return await prisma.document.create({
        data: {
            ...rest,
            effectiveDate: effectiveDate ? new Date(effectiveDate) : null,
            reviewDate: reviewDate ? new Date(reviewDate) : null,
        }
    });
};

export const updateDocument = async (id: string, data: any) => {
    const updateData = { ...data };
    if (updateData.effectiveDate) updateData.effectiveDate = new Date(updateData.effectiveDate);
    if (updateData.reviewDate) updateData.reviewDate = new Date(updateData.reviewDate);

    return await prisma.document.update({
        where: { id },
        data: updateData
    });
};

export const deleteDocument = async (id: string) => {
    return await prisma.document.delete({
        where: { id }
    });
};

// Document Versions
export const createDocumentVersion = async (data: CreateDocumentVersionInput) => {
    return await prisma.documentVersion.create({
        data
    });
};

export const getDocumentVersions = async (documentId: string) => {
    return await prisma.documentVersion.findMany({
        where: { documentId },
        orderBy: { createdAt: 'desc' }
    });
};

// Document Access Logs
export const logDocumentAccess = async (data: CreateDocumentAccessInput) => {
    return await prisma.documentAccess.create({
        data
    });
};

export const getDocumentAccessLogs = async (documentId: string) => {
    return await prisma.documentAccess.findMany({
        where: { documentId },
        orderBy: { timestamp: 'desc' }
    });
};
