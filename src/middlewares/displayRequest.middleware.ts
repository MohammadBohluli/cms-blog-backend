import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";

const displayRequest = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`${req.method}  ${req.url}  HTTP/${req.httpVersion}`);

  next();
};
export default displayRequest;
