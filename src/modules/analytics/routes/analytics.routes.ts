import { Router } from "express";
import * as analyticsController from "../controllers/analytics.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/snapshots", analyticsController.getAllSnapshots);
router.get("/snapshots/latest", analyticsController.getLatestSnapshot);
router.get("/snapshots/:id", analyticsController.getSnapshot);
router.post("/snapshots", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), analyticsController.createSnapshot);
router.get("/trends", analyticsController.getTrends);
router.get("/department-efficiency", analyticsController.getDepartmentEfficiency);

export default router;
