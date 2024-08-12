import { NextFunction, Request, Response } from "express";
import ResponseJson from "../types/responseJson.types";
import articleServices from "./article.services";
import {
  CreateArticleSchema,
  DeleteArticleSchema,
  GetArticleSchema,
  UpdateArticleSchema,
} from "./schema/article.schema";
import authServices from "../auth/auth.services";
import mongoose from "mongoose";
import { ExistObjectError } from "../errors";

class ArticleController {
  public async getAllHandler(
    req: Request,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    try {
      const articles = await articleServices.getAllArticle();
      res.status(200).json({ success: true, statusCode: 200, data: articles });
    } catch (error) {
      next(error);
    }
  }

  public async getHandler(
    req: Request<GetArticleSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { articleSlug } = req.params;
    try {
      const article = await articleServices.getArticle(articleSlug);
      res.status(200).json({ success: true, statusCode: 200, data: article });
    } catch (error) {
      next(error);
    }
  }

  public async createHandler(
    req: Request<{}, {}, CreateArticleSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { title, categories, content, status } = req.body;
    try {
      const user = authServices.checkUserUndefined(req.user);

      await articleServices.createArticle(
        user.userId,
        { title, content, status },
        categories
      );

      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Successfull created article.",
      });
    } catch (error) {
      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return next(new ExistObjectError("Article already exist."));
      }
      next(error);
    }
  }

  public async updateHandler(
    req: Request<
      UpdateArticleSchema["params"],
      {},
      UpdateArticleSchema["body"]
    >,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { articleSlug } = req.params;
    const { categories, content, status, title } = req.body;
    try {
      await articleServices.updateArticle(
        articleSlug,
        { content, status, title },
        categories as string[]
      );

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Successfull updated article.",
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteHandler(
    req: Request<DeleteArticleSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { articleSlug } = req.params;
    try {
      await articleServices.deleteArticle(articleSlug);
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Successfull deleted article.",
      });
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();
export default articleController;
