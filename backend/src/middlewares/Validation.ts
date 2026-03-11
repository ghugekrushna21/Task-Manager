import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};

export const createTaskValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Task name should be string"),

  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Task priority must be low,medium or high")
];

export const updateTaskValidation = [
  body("name")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Task name must be a string"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Task priority must be low, medium, or high"),

  body("done").optional().isBoolean().withMessage("Done must be boolean")
];
