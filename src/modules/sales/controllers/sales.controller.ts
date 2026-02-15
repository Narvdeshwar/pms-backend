import { Request, Response } from "express";
import * as salesService from "../services/sales.service";
import { CreateOrderSchema } from "../sales.validation";
import { asyncHandler, ApiError, ApiResponse } from "@/shared/utils";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const validation = CreateOrderSchema.safeParse(req.body);
    if (!validation.success) {
        throw new ApiError(400, "Invalid Order Data", (validation.error as any).errors);
    }

    const user = (req as any).user;
    if (!user) {
        throw new ApiError(401, "Authentication required");
    }

    const order = await salesService.createOrder(validation.data, user.id);

    res.status(201).json(
        new ApiResponse(201, order, "Order created successfully")
    );
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    // If user is SALES, only show their orders. Otherwise show all if admin/planner
    const salesPersonId = user.role.name === 'SALES' ? user.id : undefined;

    const orders = await salesService.getSalesOrders(salesPersonId);

    res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully")
    );
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const order = await salesService.getOrderById(id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponse(200, order, "Order fetched successfully")
    );
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const order = await salesService.updateOrder(id, req.body);

    res.status(200).json(
        new ApiResponse(200, order, "Order updated successfully")
    );
});
