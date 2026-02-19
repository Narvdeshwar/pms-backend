import { prisma } from "@/shared/db";
import { CreateAnalyticsSnapshotInput } from "../analytics.validation";

export const getAllSnapshots = async (filters?: any) => {
    const where: any = {};

    if (filters?.dateFrom || filters?.dateTo) {
        where.date = {};
        if (filters.dateFrom) where.date.gte = new Date(filters.dateFrom);
        if (filters.dateTo) where.date.lte = new Date(filters.dateTo);
    }

    return await prisma.analyticsSnapshot.findMany({
        where,
        orderBy: { date: 'desc' },
        take: filters?.limit ? parseInt(filters.limit) : 30
    });
};

export const getSnapshotById = async (id: string) => {
    return await prisma.analyticsSnapshot.findUnique({
        where: { id }
    });
};

export const createSnapshot = async (data: CreateAnalyticsSnapshotInput) => {
    const { date, ...rest } = data;
    return await prisma.analyticsSnapshot.create({
        data: {
            ...rest,
            date: new Date(date),
        }
    });
};

export const getLatestSnapshot = async () => {
    return await prisma.analyticsSnapshot.findFirst({
        orderBy: { date: 'desc' }
    });
};

export const getAnalyticsTrends = async (days: number = 7) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const snapshots = await prisma.analyticsSnapshot.findMany({
        where: {
            date: {
                gte: startDate
            }
        },
        orderBy: { date: 'asc' }
    });

    return {
        snapshots,
        averages: {
            oee: snapshots.reduce((sum, s) => sum + s.oee, 0) / snapshots.length || 0,
            availability: snapshots.reduce((sum, s) => sum + s.availability, 0) / snapshots.length || 0,
            performance: snapshots.reduce((sum, s) => sum + s.performance, 0) / snapshots.length || 0,
            quality: snapshots.reduce((sum, s) => sum + s.quality, 0) / snapshots.length || 0,
            yieldRate: snapshots.reduce((sum, s) => sum + s.yieldRate, 0) / snapshots.length || 0,
            onTimeDelivery: snapshots.reduce((sum, s) => sum + s.onTimeDelivery, 0) / snapshots.length || 0,
        }
    };
};

export const getDepartmentEfficiency = async () => {
    // Get job orders grouped by department
    const jobOrders = await prisma.jobOrder.findMany({
        where: {
            status: {
                in: ['In Progress', 'Completed']
            }
        }
    });

    // Calculate efficiency by department from departments JSON field
    const departmentStats: any = {};

    jobOrders.forEach(job => {
        if (job.departments && Array.isArray(job.departments)) {
            (job.departments as any[]).forEach((dept: any) => {
                if (!departmentStats[dept.name]) {
                    departmentStats[dept.name] = {
                        totalJobs: 0,
                        completedJobs: 0,
                        totalTime: 0,
                        efficiency: 0
                    };
                }
                departmentStats[dept.name].totalJobs++;
                if (dept.status === 'Completed') {
                    departmentStats[dept.name].completedJobs++;
                }
            });
        }
    });

    // Calculate efficiency percentage
    Object.keys(departmentStats).forEach(deptName => {
        const stats = departmentStats[deptName];
        stats.efficiency = stats.totalJobs > 0
            ? (stats.completedJobs / stats.totalJobs) * 100
            : 0;
    });

    return departmentStats;
};
