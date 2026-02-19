import { z } from "zod";

export const CreateAnalyticsSnapshotSchema = z.object({
    date: z.string(),
    oee: z.number(),
    availability: z.number(),
    performance: z.number(),
    quality: z.number(),
    yieldRate: z.number(),
    onTimeDelivery: z.number(),
    activeJobs: z.number().int(),
    completedJobs: z.number().int(),
    activeIssues: z.number().int(),
    inventoryValue: z.number(),
});

export type CreateAnalyticsSnapshotInput = z.infer<typeof CreateAnalyticsSnapshotSchema>;
