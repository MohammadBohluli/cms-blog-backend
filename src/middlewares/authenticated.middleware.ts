import { NextFunction, Request, Response } from "express";
import userRepo from "../auth/auth.repository";
import userServices from "../auth/auth.services";
import { NotAuthenticatedError } from "../errors";

const authenticated = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader && bearerHeader.split(" ")[1];

  try {
    if (!token) throw new NotAuthenticatedError();

    const decoded = await userServices.verifyAccessToken(token);

    const user = await userRepo.getUserById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticated;
