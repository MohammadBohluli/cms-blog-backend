import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import authServices from "../auth/auth.services";
import { ExistObjectError } from "../errors";
import ResponseJson from "../types/responseJson.types";
import { isDefined, UploadImage } from "../utils";
import articleServices from "./article.services";
import {
  CreateArticleSchema,
  DeleteArticleSchema,
  GetArticleSchema,
  GetUserArticlesSchema,
  QueryArticlesSchema,
  UpdateArticleSchema,
} from "./schema/article.schema";

class ArticleController {
  public async getAllHandler(
    req: Request<{}, {}, {}, QueryArticlesSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    try {
      const { articleList, pagination } = await articleServices.getAllArticle(
        req.query
      );

      res.status(200).json({
        success: true,
        statusCode: 200,
        data: articleList,
        pagination: {
          totalPages: pagination.totalPages,
          previousPage: pagination.previousPage,
          currentPage: pagination.currentPage,
          nextPage: pagination.nextPage,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUserArticlesHandler(
    req: Request<GetUserArticlesSchema>,

    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { userId } = req.params;

    try {
      const articles = await articleServices.getUserArticles(userId);
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
    const user = authServices.checkUserUndefined(req.user);
    try {
      if (isDefined(req.file)) {
        const imageFile = req.file;
        await articleServices.createArticle(user.userId, req.body, imageFile);
      }

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
        return next(
          new ExistObjectError(
            "Article already exist with title, please change your title."
          )
        );
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

    try {
      if (isDefined(req.file)) {
        const imageFile = req.file;
        await articleServices.updateArticle(articleSlug, req.body, imageFile);
      }

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
