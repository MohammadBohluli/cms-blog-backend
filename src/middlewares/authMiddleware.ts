import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth middleware is run 🔐");
  next();
};

export default authMiddleware;
