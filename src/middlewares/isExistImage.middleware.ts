import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors";

/**
 * Note: this middleware must be define before upload.single()
 */
const isExistImage = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) {
    // FIXME: create BadRequestError
    return next(new NotFoundError("Image not found"));
  }

  next();
};

export default isExistImage;
