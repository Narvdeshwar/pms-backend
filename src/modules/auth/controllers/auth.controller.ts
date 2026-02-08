import { Request, Response } from "express";
import * as authService from "../services"
import { LoginSchema, RegisterSchema } from "../auth.validation";
import { asyncHandler, ApiError, ApiResponse } from "@/shared/utils";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const validation = RegisterSchema.safeParse(req.body)
    if (!validation.success) throw new ApiError(400, "Validation Failed", (validation.error as any).errors)
    try {
        const user = await authService.RegisterUser(validation.data)
        res.status(201).json(new ApiResponse(201, user, "User registered successfully"))
    } catch (error: any) {
        throw new ApiError(409, error.message)
    }
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const validation = LoginSchema.safeParse(req.body);
    if (!validation.success) {
        throw new ApiError(400, "Invalid Inputs", (validation.error as any).errors);
    }
    try {
        const result = await authService.LoginUser(validation.data);

        res.status(200).json(
            new ApiResponse(200, result, "Login Successful")
        );
    } catch (error: any) {
        throw new ApiError(401, error.message);
    }
});
