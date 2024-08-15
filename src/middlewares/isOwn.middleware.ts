import { NextFunction, Request, Response } from "express";
import articleServices from "../articles/article.services";
import authServices from "../auth/auth.services";
import { PermissionDeniedError } from "../errors";
import { GetArticleSchema } from "../articles/schema/article.schema";

const isOwn = async function (
  req: Request<GetArticleSchema>,
  res: Response,
  next: NextFunction
) {
  const article = await articleServices.getArticle(req.params.articleSlug);
  try {
    const user = authServices.checkUserUndefined(req.user);

    if (user.userId != article.userId.toString()) {
      throw new PermissionDeniedError();
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isOwn;
