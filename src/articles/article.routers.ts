import { Router } from "express";
import articleController from "./article.controllers";
import { authenticated, isOwn, validateSchema } from "../middlewares";
import {
  createArticleSchema,
  updateArticleSchema,
} from "./schema/article.schema";

const router = Router();

router.get("/", articleController.getAllHandler);

router.get("/:userId", articleController.getUserArticlesHandler);

router.get("/:articleSlug", articleController.getHandler);

router.post(
  "/",
  [authenticated, validateSchema(createArticleSchema)],
  articleController.createHandler
);

router.put(
  "/:articleSlug",
  [authenticated, isOwn, validateSchema(updateArticleSchema)],
  articleController.updateHandler
);

router.delete(
  "/:articleSlug",
  [authenticated, isOwn],
  articleController.deleteHandler
);

export default router;
