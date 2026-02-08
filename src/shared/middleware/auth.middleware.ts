import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@/shared/db";

const JWT_SECRET = process.env.JWT_SECRET || "something";

interface JwtPayload {
    userId: string;
    role: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { role: true }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user || !roles.includes(user.role.name)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to perform this action" });
        }
        next();
    };
};
