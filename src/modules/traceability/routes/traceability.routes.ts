import { Router } from "express";
import * as traceabilityController from "../controllers/traceability.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

// Lot routes
router.get("/lots", traceabilityController.getAllLots);
router.get("/lots/:id", traceabilityController.getLot);
router.post("/lots", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "INVENTORY_WAREHOUSE_MANAGER"]), traceabilityController.createLot);
router.patch("/lots/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "INVENTORY_WAREHOUSE_MANAGER"]), traceabilityController.updateLot);
router.delete("/lots/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), traceabilityController.deleteLot);

// Serial routes
router.get("/serials", traceabilityController.getAllSerials);
router.get("/serials/:id", traceabilityController.getSerial);
router.post("/serials", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "INVENTORY_WAREHOUSE_MANAGER"]), traceabilityController.createSerial);
router.patch("/serials/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "INVENTORY_WAREHOUSE_MANAGER"]), traceabilityController.updateSerial);
router.delete("/serials/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), traceabilityController.deleteSerial);

// Traceability records
router.get("/records", traceabilityController.getTraceabilityRecords);
router.post("/records", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR", "SHOP_FLOOR_SUPERVISOR", "LINE_OPERATOR"]), traceabilityController.createTraceabilityRecord);

export default router;
