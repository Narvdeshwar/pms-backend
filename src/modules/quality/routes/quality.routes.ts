import { Router } from "express";
import * as qualityController from "../controllers/quality.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

// Inspection Plan routes
router.get("/plans", qualityController.getAllPlans);
router.get("/plans/:id", qualityController.getPlan);
router.post("/plans", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), qualityController.createPlan);
router.patch("/plans/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), qualityController.updatePlan);
router.delete("/plans/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), qualityController.deletePlan);

// Inspection Record routes
router.get("/records", qualityController.getAllRecords);
router.get("/records/:id", qualityController.getRecord);
router.post("/records", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "SHOP_FLOOR_SUPERVISOR"]), qualityController.createRecord);
router.patch("/records/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), qualityController.updateRecord);
router.delete("/records/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), qualityController.deleteRecord);

export default router;
