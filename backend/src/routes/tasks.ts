import express from "express";
import * as TaskController from "../controllers/tasksController";
import * as Validation from "../middlewares/Validation";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

// 🔐 APPLY AUTH FIRST
router.use(authenticate);

// GET /api/tasks
router.get("/", TaskController.getTasks);

// GET /api/tasks/stats
router.get("/stats", TaskController.taskStats);

router.get("/:id", TaskController.getTask);

router.post(
  "/",
  Validation.createTaskValidation,
  Validation.validateRequest,
  TaskController.createTask
);

router.put(
  "/:id",
  Validation.updateTaskValidation,
  Validation.validateRequest,
  TaskController.updateTask
);

router.delete("/:id", TaskController.deleteTask);

router.patch("/:id/toggle", TaskController.toggleTask);

export default router;
