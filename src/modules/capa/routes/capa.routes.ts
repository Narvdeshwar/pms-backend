import { Router } from "express";
import * as capaController from "../controllers/capa.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

// CAPA routes
router.get("/", capaController.getAllCAPAs);
router.get("/:id", capaController.getCAPA);
router.post("/", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), capaController.createCAPA);
router.patch("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), capaController.updateCAPA);
router.delete("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), capaController.deleteCAPA);

// CAPA Action routes
router.post("/actions", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "SHOP_FLOOR_SUPERVISOR"]), capaController.createAction);
router.get("/:id/actions", capaController.getActions);
router.patch("/:id/actions/:actionId", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "SHOP_FLOOR_SUPERVISOR"]), capaController.updateAction);
router.delete("/:id/actions/:actionId", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), capaController.deleteAction);

export default router;
