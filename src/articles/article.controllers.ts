import { NextFunction, Request, Response } from "express";
import authServices from "../auth/auth.services";
import ResponseJson from "../types/responseJson.types";
import { HttpStatusCode } from "../utils";
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

      res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
      res
        .status(HttpStatusCode.SUCCESS_OK)
        .json({ statusCode: HttpStatusCode.SUCCESS_OK, data: articles });
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
      res
        .status(HttpStatusCode.SUCCESS_OK)
        .json({ statusCode: HttpStatusCode.SUCCESS_OK, data: article });
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
      if (req.file) {
        const imageFile = req.file;
        await articleServices.createArticle(user.userId, req.body, imageFile);
      }

      res.status(HttpStatusCode.SUCCESS_CREATED).json({
        statusCode: HttpStatusCode.SUCCESS_CREATED,
        message: "Successfull created article.",
      });
    } catch (error) {
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
      if (req.file) {
        const imageFile = req.file;
        await articleServices.updateArticle(articleSlug, req.body, imageFile);
      }

      res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
      res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
        message: "Successfull deleted article.",
      });
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();
export default articleController;
