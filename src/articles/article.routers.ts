import { Router } from "express";
import articleController from "./article.controllers";
import { authenticated, validateSchema } from "../middlewares";
import {
  createArticleSchema,
  updateArticleSchema,
} from "./schema/article.schema";

const router = Router();

router.get("/", articleController.getAllHandler);

// get own post
router.get("/:userId", articleController.getUserArticlesHandler);

router.get("/:articleSlug", articleController.getHandler);

router.post(
  "/",
  [authenticated, validateSchema(createArticleSchema)],
  articleController.createHandler
);

router.put(
  "/:articleSlug",
  [authenticated, validateSchema(updateArticleSchema)],
  articleController.updateHandler
);

router.delete("/:articleSlug", authenticated, articleController.deleteHandler);

export default router;
