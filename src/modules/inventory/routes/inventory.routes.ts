import { Router } from "express";
import * as inventoryController from "../controllers/inventory.controller";
import { authenticate, authorize } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/", inventoryController.getAllItems);
router.get("/:id", inventoryController.getItem);

// Managing inventory requires appropriate roles
router.post("/", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "INVENTORY_CONTROLLER"]), inventoryController.createItem);
router.patch("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "INVENTORY_CONTROLLER"]), inventoryController.updateItem);
router.delete("/:id", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "INVENTORY_CONTROLLER"]), inventoryController.deleteItem);

// Transactions
router.post("/:id/transactions", authorize(["IT_SYSTEM_ADMIN", "PLANT_MANAGER", "INVENTORY_CONTROLLER", "SHOP_FLOOR_SUPERVISOR"]), inventoryController.createTransaction);

export default router;
