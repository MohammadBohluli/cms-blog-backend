import { NextFunction, Request, Response } from "express";
import ResponseJson from "../types/responseJson.types";
import { HttpStatusCode } from "../utils";
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
        .status(HttpStatusCode.SUCCESS_OK)
        .json({ statusCode: HttpStatusCode.SUCCESS_OK, data: categories });
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

      res
        .status(HttpStatusCode.SUCCESS_OK)
        .json({ statusCode: HttpStatusCode.SUCCESS_OK, data: category });
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
      res.status(HttpStatusCode.SUCCESS_CREATED).json({
        statusCode: HttpStatusCode.SUCCESS_CREATED,
        message: "Successfully created Category",
      });
    } catch (error) {
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

    try {
      await categoryServices.updateCategory(categorySlug, req.body);
      res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
        message: "Successfully update.",
      });
    } catch (error) {
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
      res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
        message: "Successfully deleted category",
      });
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;
