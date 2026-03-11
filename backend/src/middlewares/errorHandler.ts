import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error : ${error.message}`);
  console.error(`Stack ${error.stack}`);
  const statusCode = res.statusCode >= 299 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === "Production" ? "PROD" : error.stack
  });
};
