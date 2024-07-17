import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import config from "config";
import articleController from "./articles/articleControllers";
import userController from "./users/userControllers";
import connectToDb from "./utils/connectToDb";
import logger from "./utils/logger";

// config
const app: Application = express();
// dotenv.config();
const PORT = config.get<number>("port");

// middlewares
app.use(cors());
app.use(express.json());

// rout group
app.use("/api/users", userController);
app.use("/api/articles", articleController);

// server start
app.listen(PORT, () => {
  logger.info(`Server is Running on address: http://localhost:${PORT}`);
  connectToDb();
});
