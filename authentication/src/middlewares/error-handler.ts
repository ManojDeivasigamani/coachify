import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error-handlers/custom-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // If not Request Validation Error or Database connection Error, Send some Generic Error Message
  console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong!!!" }],
  });
};
