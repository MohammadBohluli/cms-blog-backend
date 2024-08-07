import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors";

const errorHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    console.log(err);
    return res.status(err.statusCode).json(err.serialize());
  }

  console.log(err);
  res.status(500).json({
    message: "Internal server error",
    statusCode: 500,
  });
};

export default errorHandler;
