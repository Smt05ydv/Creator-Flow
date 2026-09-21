import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";
import type { Request,Response,NextFunction } from "express";

export const validate = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: {
        [key: string]: string;
    }[] = [];

  errors.array().map((err) =>
    extractedErrors.push({
      [err.type==="field"?err.path:"unknown"]: err.msg,
    }),
  );
  throw new ApiError(422, "Recieved data is not valid", extractedErrors);
};