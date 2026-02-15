import { Router } from "express";
import * as salesController from "../controllers/sales.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

// Both SALES and admins can create orders
router.post(
    "/orders",
    authorize(["SALES", "PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN"]),
    salesController.createOrder
);

// Get orders (filtered by salesperson if role is SALES)
router.get(
    "/orders",
    authorize(["SALES", "PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN", "PLANT_MANAGER"]),
    salesController.getMyOrders
);

// Get single order
router.get(
    "/orders/:id",
    authorize(["SALES", "PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN", "PLANT_MANAGER"]),
    salesController.getOrder
);

// Update order
router.patch(
    "/orders/:id",
    authorize(["SALES", "PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN"]),
    salesController.updateOrder
);

export default router;
