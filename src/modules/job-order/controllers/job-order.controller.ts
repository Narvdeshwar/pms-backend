import { Request, Response } from "express";
import * as jobOrderService from "../services/job-order.service";
import { CreateJobOrderSchema, UpdateJobOrderSchema } from "../job-order.validation";
import { asyncHandler, ApiError, ApiResponse } from "@/shared/utils";

export const getAllJobOrders = asyncHandler(async (req: Request, res: Response) => {
    const jobOrders = await jobOrderService.getJobOrders();
    res.status(200).json(new ApiResponse(200, jobOrders, "Job orders fetched successfully"));
});

export const getJobOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const jobOrder = await jobOrderService.getJobOrderById(id);
    if (!jobOrder) {
        throw new ApiError(404, "Job order not found");
    }
    res.status(200).json(new ApiResponse(200, jobOrder, "Job order fetched successfully"));
});

export const createJobOrder = asyncHandler(async (req: Request, res: Response) => {
    const validation = CreateJobOrderSchema.safeParse(req.body);
    if (!validation.success) {
        throw new ApiError(400, "Invalid Job Order Data", (validation.error as any).errors);
    }

    const jobOrder = await jobOrderService.createJobOrder(validation.data);
    res.status(201).json(new ApiResponse(201, jobOrder, "Job order created successfully"));
});

export const updateJobOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const validation = UpdateJobOrderSchema.safeParse(req.body);
    if (!validation.success) {
        throw new ApiError(400, "Invalid Job Order Data", (validation.error as any).errors);
    }

    const jobOrder = await jobOrderService.updateJobOrder(id, validation.data);
    res.status(200).json(new ApiResponse(200, jobOrder, "Job order updated successfully"));
});

export const deleteJobOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await jobOrderService.deleteJobOrder(id);
    res.status(200).json(new ApiResponse(200, null, "Job order deleted successfully"));
});
