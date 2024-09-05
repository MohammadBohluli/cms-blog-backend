import { NextFunction, Request, Response } from "express";
import { BaseError, ExistObjectError } from "../errors";
import mongoose from "mongoose";

const errorHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    return res.status(409).json({
      message: "User already exist with this email.",
      statusCode: 409,
    });
  }

  if (err instanceof BaseError) {
    console.log(err);
    return res.status(err.statusCode).json(err.serialize());
  }

  console.log(err);
  res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
  });
};

export default errorHandler;
