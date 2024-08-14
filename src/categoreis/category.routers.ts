import { Router } from "express";
import { authenticated, isAdmin, validateSchema } from "../middlewares";
import categoryController from "./category.controllers";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./schema/category.schema";

const router = Router();

router.get("/", categoryController.getAllHandler);

router.get("/:categorySlug", categoryController.getHandler);

router.post(
  "/",
  [authenticated, isAdmin],
  validateSchema(createCategorySchema),
  categoryController.createHandler
);

router.put(
  "/:categorySlug",
  [authenticated, isAdmin],
  validateSchema(updateCategorySchema),
  categoryController.updateHandler
);

router.delete(
  "/:categorySlug",
  [authenticated, isAdmin],
  categoryController.deleteHandler
);

export default router;
