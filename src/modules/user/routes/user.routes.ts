import { Router } from "express";
import { userControllers as userController } from "@/modules/user";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

// All routes here require authentication and super admin roles
router.use(authenticate);
router.use(authorize(["PRODUCTION_PLANNER", "IT_SYSTEM_ADMIN"]));

router.get("/", userController.getAllUsers);
router.get("/roles", userController.getAllRoles);
router.put("/update", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
