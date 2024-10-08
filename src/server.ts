import cors from "cors";
import express from "express";
import articlesRouter from "./articles/article.routers";
import authRouter from "./auth/auth.routers";
import categoriesRouter from "./categoreis/category.routers";
import { displayRequest, errorHandler } from "./middlewares";
import { connectToDb, createUserAdmin, logger, swaggerDocs } from "./utils";

// config
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(displayRequest);
app.use("/images", express.static("images"));

// route group
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/articles", articlesRouter);

// error handler middleware
app.use(errorHandler);

// server start
app.listen(process.env.PORT, async () => {
  logger.info(`✅ Server is Running 👉  http://localhost:${process.env.PORT}`);
  await connectToDb();
  await createUserAdmin();
  swaggerDocs(app);
});
