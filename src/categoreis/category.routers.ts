import { Router } from "express";
import categoryController from "./category.controllers";

const router = Router();

router.get("/categories", categoryController.getAllHandler);
router.get("/categories::categorySlug", categoryController.getHandler);
router.post("/categories", categoryController.createHandler);
router.patch("/categories:categorySlug", categoryController.updateHandler);
router.delete("/categories:categorySlug", categoryController.deleteHandler);

export default router;
