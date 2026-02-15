import { z } from "zod";

export const CreateIssueSchema = z.object({
    title: z.string().min(1, "Title is required"),
    jobId: z.string().optional(),
    department: z.string().optional(),
    severity: z.enum(["critical", "high", "medium", "low"]),
    status: z.enum(["open", "in-progress", "resolved"]).optional().default("open"),
    reportedBy: z.string().min(1, "Reporter name is required"),
    impact: z.string().optional(),
});

export type CreateIssueInput = z.infer<typeof CreateIssueSchema>;

export const UpdateIssueSchema = CreateIssueSchema.partial();
