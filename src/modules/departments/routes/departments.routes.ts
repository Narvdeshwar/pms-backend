import { Router } from "express";
import * as departmentsController from "../controllers/departments.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/", departmentsController.getAllDepartments);
router.get("/:id", departmentsController.getDepartment);

// Only admins can manage departments
router.post("/", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), departmentsController.createDepartment);
router.patch("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), departmentsController.updateDepartment);
router.delete("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER"]), departmentsController.deleteDepartment);

export default router;
