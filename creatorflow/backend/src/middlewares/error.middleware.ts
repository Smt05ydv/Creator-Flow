
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = 500;
    let message = "Internal server error";

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "Database validation failed";
    } else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid value provided";
    } else if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === 11000
    ) {
        statusCode = 409;
        message = "A record with these values already exists";
    }

    // Keep internal error details on the server.
    if (statusCode >= 500) {
        console.error("Internal server error:", err);
    }

    return res.status(statusCode).json(
        new ApiResponse(statusCode, null, message)
    );
};
