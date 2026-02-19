import { prisma } from "@/shared/db";
import { CreateAuditLogInput } from "../audit.validation";

export const getAllAuditLogs = async (filters?: any) => {
    const where: any = {};

    if (filters?.action) where.action = filters.action;
    if (filters?.resource) where.resource = filters.resource;
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.status) where.status = filters.status;
    if (filters?.dateFrom || filters?.dateTo) {
        where.timestamp = {};
        if (filters.dateFrom) where.timestamp.gte = new Date(filters.dateFrom);
        if (filters.dateTo) where.timestamp.lte = new Date(filters.dateTo);
    }

    return await prisma.auditLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: filters?.limit ? parseInt(filters.limit) : 100
    });
};

export const getAuditLogById = async (id: string) => {
    return await prisma.auditLog.findUnique({
        where: { id }
    });
};

export const createAuditLog = async (data: CreateAuditLogInput) => {
    return await prisma.auditLog.create({
        data
    });
};

export const getAuditStats = async () => {
    const totalLogs = await prisma.auditLog.count();
    const successLogs = await prisma.auditLog.count({ where: { status: 'success' } });
    const failureLogs = await prisma.auditLog.count({ where: { status: 'failure' } });

    const actionCounts = await prisma.auditLog.groupBy({
        by: ['action'],
        _count: true,
        orderBy: {
            _count: {
                action: 'desc'
            }
        },
        take: 10
    });

    const resourceCounts = await prisma.auditLog.groupBy({
        by: ['resource'],
        _count: true,
        orderBy: {
            _count: {
                resource: 'desc'
            }
        },
        take: 10
    });

    return {
        totalLogs,
        successLogs,
        failureLogs,
        successRate: totalLogs > 0 ? ((successLogs / totalLogs) * 100).toFixed(2) : '0',
        topActions: actionCounts,
        topResources: resourceCounts
    };
};
