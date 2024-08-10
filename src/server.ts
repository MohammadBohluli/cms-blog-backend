import config from "config";
import cors from "cors";
import express, { Application } from "express";
import authRouter from "./auth/auth.routers";
import { displayRequest, errorHandler } from "./middlewares";
import { connectToDb, logger } from "./utils";
import categoriesRouter from "./categoreis/category.routers";

// config
const app: Application = express();

const PORT = config.get<number>("port");

// middlewares
app.use(cors());
app.use(express.json());
app.use(displayRequest);

// rout group
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);

// error handler middleware
app.use(errorHandler);

// server start
app.listen(PORT, () => {
  logger.info(`✅ Server is Running 👉  http://localhost:${PORT}`);
  connectToDb();
});
