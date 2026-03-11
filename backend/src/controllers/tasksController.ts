import { NextFunction, Request, Response } from "express";
import * as TaskModel from "../models/taskModel";
import {
  AuthRequest,
  CreateTaskPayload,
  Priority,
  UpdateTaskPayload
} from "../types";

const ensureIsAuthenticated = (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Not authenticated" });
    return false;
  }

  return true;
};

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { done, priority, q, sortBy, order, page, limit } = req.query;

    if (typeof page === "string") {
      const pageNumber = Number(page);
      const limitNumber = typeof limit === "string" ? Number(limit) : 10;

      if (
        Number.isNaN(pageNumber) ||
        Number.isNaN(limitNumber) ||
        pageNumber <= 0 ||
        limitNumber <= 0
      ) {
        return res.status(400).json({
          message: "Invalid page or limit value"
        });
      }

      const tasks = await TaskModel.taskPagination(pageNumber, limitNumber);

      return res.status(200).json(tasks);
    }

    if (typeof done === "string") {
      if (done !== "true" && done !== "false") {
        return res.status(400).json({
          message: "Invalid done value. Use true or false"
        });
      }

      const status = done === "true";
      const tasks = await TaskModel.filterTaskByCompletionStatus(status);

      if (tasks.length === 0) {
        return res.status(404).json({
          message: "No task found "
        });
      }

      return res.json(tasks);
    }

    if (priority) {
      const tasks = await TaskModel.filteredTasksByPriority(
        priority as Priority
      );

      if (tasks.length === 0) {
        return res.status(404).json({
          message: "No task found for given priority"
        });
      }

      return res.status(200).json(tasks);
    }

    if (typeof q === "string" && q) {
      const tasks = await TaskModel.searchTask(q);

      if (tasks.length === 0) {
        return res.status(404).json({
          message: "No task found for the given search"
        });
      }

      return res.status(200).json(tasks);
    }

    if (sortBy) {
      const tasks = await TaskModel.getSortedTasks(
        sortBy as "createdAt" | "priority",
        order as "asc" | "desc"
      );
      return res.json(tasks);
    }

    if (!ensureIsAuthenticated(req, res)) return;
    const tasks = await TaskModel.getAllTasksByUserId(req.userId!);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const { id } = req.params;
    const task = await TaskModel.getTaskById(Number(id), req.userId!);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const newTask = await TaskModel.createTask(req.body, req.userId!);

    res.json(newTask);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const updatedTask = await TaskModel.updateTask(
      Number(id),
      req.userId!,
      req.body
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const deleted = await TaskModel.deleteTask(Number(id), req.userId!);

    deleted
      ? res.status(204).send()
      : res.status(404).json({ message: "Task not found" });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/tasks/:id/toggle

export const toggleTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const toggledTask = await TaskModel.toggleTask(Number(id));

    toggledTask
      ? res.status(200).json(toggledTask)
      : res.status(404).json({ message: "Task not found" });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/stats

export const taskStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await TaskModel.taskStats();

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
