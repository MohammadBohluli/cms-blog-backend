import { NextFunction, Request, Response } from "express";
import userServices from "../auth/auth.services";
import { PermissionDeniedError } from "../errors";
import { UserRole } from "../types/user.types";

const isAdmin = function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = userServices.checkUserUndefined(req.user);
    if (user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
