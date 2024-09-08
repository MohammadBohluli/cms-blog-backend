import { Router } from "express";
import {
  authenticated,
  isExistImage,
  isOwn,
  validateSchema,
} from "../middlewares";
import { multerConfig } from "../utils";
import articleController from "./article.controllers";
import {
  createArticleSchema,
  updateArticleSchema,
} from "./schema/article.schema";

const router = Router();

router.get("/", articleController.getAllHandler);

router.get("/users/:userId", articleController.getUserArticlesHandler);

router.get("/:articleSlug", articleController.getHandler);

router.post(
  "/",
  [
    authenticated,
    multerConfig.single("image"),
    isExistImage,
    validateSchema(createArticleSchema),
  ],
  articleController.createHandler
);

router.put(
  "/:articleSlug",
  [
    authenticated,
    isOwn,
    multerConfig.single("image"),
    isExistImage,
    validateSchema(updateArticleSchema),
  ],
  articleController.updateHandler
);

router.delete(
  "/:articleSlug",
  [authenticated, isOwn],
  articleController.deleteHandler
);

export default router;
