import { Router } from "express";
import * as issuesController from "../controllers/issues.controller";
import { authenticate } from "@/shared/middleware";

const router = Router();

router.use(authenticate);

router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getIssue);
router.post("/", issuesController.createIssue);
router.patch("/:id", issuesController.updateIssue);
router.delete("/:id", issuesController.deleteIssue);

export default router;
