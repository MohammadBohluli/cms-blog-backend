import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse({
      body: req.body,
      params: req.params,
    });

    // if (!success) {
    //   return res.status(401).json({
    //     clientErrors: error.errors.map((field) => {
    //       const myobj: { [key: string]: string } = {
    //         [field.path[1]]: field.message,
    //       };
    //       return myobj;
    //     }),
    //   });
    // }

    if (!success) {
      return res.status(400).json({
        statusCode: 400,
        clientErrors: error.errors.map((field) => field.message),
      });
    }

    next();
  };

export default validateSchema;
