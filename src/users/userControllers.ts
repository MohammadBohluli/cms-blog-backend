import { Request, Response, Router } from "express";

import { getAllUser, getUserById } from "./userServcies";
import { createUserSchema } from "./schema/userSchema";
import { validationMiddleware } from "../middlewares/userValidateMiddleware";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.json(getAllUser());
  } catch (e) {
    console.log(e);
    res.status(500).json({ errorMessage: "server error" });
  }
});

router.get("/:id", (req: Request, res: Response) => {
  res.json(getUserById(parseInt(req.params.id)));
});

router.post(
  "/",
  validationMiddleware(createUserSchema),
  (req: Request, res: Response) => {
    res.send("post user");
  }
);

router.put("/:id", (req: Request, res: Response) => {
  res.send("put user");
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send("delete user");
});
export default router;
