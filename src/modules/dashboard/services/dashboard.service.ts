import { prisma } from "@/shared/db";

export const getStats = async () => {
    // In a real system, these would be calculated from various tables
    // For now, we'll derive some from JobOrder and Order

    const totalJobOrders = await prisma.jobOrder.count();
    const completedJobOrders = await prisma.jobOrder.count({
        where: { status: 'Completed' }
    });

    const inProgressJobs = await prisma.jobOrder.count({
        where: { status: 'In Progress' }
    });

    // Mock calculations for demo purposes
    const oee = "82.4%"; // Usually (Availability * Performance * Quality)
    const yieldRate = totalJobOrders > 0
        ? `${((completedJobOrders / totalJobOrders) * 100).toFixed(1)}%`
        : "98.1%";

    const onTimeDelivery = "94.2%";
    const activeIssues = await prisma.jobOrder.count({
        where: {
            status: {
                in: ['Delayed', 'On Hold', 'Issue']
            }
        }
    }) || 3;

    return {
        oee,
        yieldRate,
        onTimeDelivery,
        activeIssues
    };
};

export const getRecentActivity = async () => {
    // We can pull recent job orders and orders as activity
    const recentJobs = await prisma.jobOrder.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' }
    });

    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { salesPerson: true }
    });

    const activities = [
        ...recentJobs.map(job => ({
            action: `Job ${job.jobId} status updated to ${job.status}`,
            type: job.status === 'Completed' ? 'success' : 'info',
            time: job.updatedAt.toISOString()
        })),
        ...recentOrders.map(order => ({
            action: `New Order ${order.orderNumber} created by ${order.salesPerson.name}`,
            type: 'info',
            time: order.createdAt.toISOString()
        }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

    return activities;
};
