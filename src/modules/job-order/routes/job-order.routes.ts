import { Router } from "express";
import * as jobOrderController from "../controllers/job-order.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/", jobOrderController.getAllJobOrders);
router.get("/:id", jobOrderController.getJobOrder);
router.post("/", authorize(["PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN", "SALES", "PLANT_MANAGER"]), jobOrderController.createJobOrder);
router.patch("/:id", authorize(["PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), jobOrderController.updateJobOrder);
router.delete("/:id", authorize(["PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), jobOrderController.deleteJobOrder);

export default router;
