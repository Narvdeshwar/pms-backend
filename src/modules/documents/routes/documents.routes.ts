import { Router } from "express";
import * as documentsController from "../controllers/documents.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

// Document routes
router.get("/", documentsController.getAllDocuments);
router.get("/:id", documentsController.getDocument);
router.post("/", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), documentsController.createDocument);
router.patch("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), documentsController.updateDocument);
router.delete("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), documentsController.deleteDocument);

// Version routes
router.post("/versions", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), documentsController.createVersion);
router.get("/:id/versions", documentsController.getVersions);

// Access log routes
router.post("/access", documentsController.logAccess);
router.get("/:id/access", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "QUALITY_INSPECTOR"]), documentsController.getAccessLogs);

export default router;
