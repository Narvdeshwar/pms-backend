import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/shared/utils";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  // Check if the error is an instance of ApiError, if not, create a generic 500 ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof Error ? 400 : 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Show stack trace only in dev
  };

  // Send the response
  res.status(error.statusCode).json(response);
};
