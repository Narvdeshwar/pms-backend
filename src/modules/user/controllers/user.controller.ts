import { Request, Response } from "express";
import { userServices as userService } from "@/modules/user";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId, roleId, departmentId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const updatedUser = await userService.updateUser(userId, { roleId, departmentId });
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id as string);
        res.json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await userService.getAllRoles();
        res.json(roles);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
