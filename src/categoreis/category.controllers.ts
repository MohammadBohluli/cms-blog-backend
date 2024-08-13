import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ExistObjectError } from "../errors";
import ResponseJson from "../types/responseJson.types";
import categoryServices from "./category.services";
import {
  CreateCategorySchema,
  DeleteCategorySchema,
  GetCategorySchema,
  UpdateCategorySchema,
} from "./schema/category.schema";

class CategoryController {
  public async getAllHandler(
    req: Request,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    try {
      const categories = await categoryServices.getAllCategory();
      res
        .status(200)
        .json({ success: true, statusCode: 200, data: categories });
    } catch (error) {
      next(error);
    }
  }

  public async getHandler(
    req: Request<GetCategorySchema, {}, {}>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { categorySlug } = req.params;
    try {
      const category = await categoryServices.getCategory(categorySlug);

      res.status(200).json({ success: true, statusCode: 200, data: category });
    } catch (error) {
      next(error);
    }
  }
  public async createHandler(
    req: Request<{}, {}, CreateCategorySchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { title } = req.body;
    try {
      await categoryServices.createCategory(title);
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Successfully created Category",
      });
    } catch (error) {
      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return next(new ExistObjectError("Category already exist."));
      }
      next(error);
    }
  }
  public async updateHandler(
    req: Request<
      UpdateCategorySchema["params"],
      {},
      UpdateCategorySchema["body"]
    >,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { categorySlug } = req.params;
    const { title } = req.body;
    try {
      await categoryServices.updateCategory(categorySlug, title);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Successfully update.",
      });
    } catch (error) {
      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return next(new ExistObjectError("Category already exist."));
      }
      next(error);
    }
  }
  public async deleteHandler(
    req: Request<DeleteCategorySchema, {}, {}>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { categorySlug } = req.params;
    try {
      await categoryServices.deleteCategory(categorySlug);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Successfully deleted category",
      });
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;
