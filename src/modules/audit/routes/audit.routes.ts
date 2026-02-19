import { Router } from "express";
import * as auditController from "../controllers/audit.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), auditController.getAllAuditLogs);
router.get("/stats", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), auditController.getAuditStats);
router.get("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), auditController.getAuditLog);
router.post("/", auditController.createAuditLog);

export default router;
