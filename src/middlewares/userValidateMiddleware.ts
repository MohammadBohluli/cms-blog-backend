import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validationMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse(req.body);

    if (!success)
      return res.status(401).json({
        errors: error.errors.map(
          (field) => `${field.path[0]}: ${field.message}`
        ),
      });

    next();
  };
