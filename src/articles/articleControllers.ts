import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("get articles");
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("get article");
});

router.post("/", (req: Request, res: Response) => {
  res.send("post article");
});

router.put("/:id", (req: Request, res: Response) => {
  res.send("put article");
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send("delete article");
});
export default router;
