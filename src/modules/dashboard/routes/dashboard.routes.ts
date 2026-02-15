import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authenticate } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/stats", dashboardController.getDashboardStats);
router.get("/recent-activity", dashboardController.getRecentActivity);

export default router;
