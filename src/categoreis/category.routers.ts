import { Router } from "express";
import categoryController from "./category.controllers";
import { validateSchema } from "../middlewares";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./schema/category.schema";

const router = Router();

router.get("/", categoryController.getAllHandler);

router.get("/:categorySlug", categoryController.getHandler);

router.post(
  "/",
  validateSchema(createCategorySchema),
  categoryController.createHandler
);

router.patch(
  "/:categorySlug",
  validateSchema(updateCategorySchema),
  categoryController.updateHandler
);

router.delete("/:categorySlug", categoryController.deleteHandler);

export default router;
