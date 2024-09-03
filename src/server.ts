import cors from "cors";
import express, { Application } from "express";
import articlesRouter from "./articles/article.routers";
import authRouter from "./auth/auth.routers";
import categoriesRouter from "./categoreis/category.routers";
import { displayRequest, errorHandler } from "./middlewares";
import { connectToDb, logger } from "./utils";

// config
const app: Application = express();

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
app.listen(process.env.PORT, () => {
  logger.info(`✅ Server is Running 👉  http://localhost:${process.env.PORT}`);
  connectToDb();
});

// export default {
//   //
//   port: 3000,
//   dbURI: "mongodb://192.168.1.4:27017/cms-blog-db",
//   accessTokenSecretKey: "your_access_Token_Secret_Key",
//   refreshTokenSecretKey: "your_refresh_Token_Secret_Key",
//   smtp: {
//     user: "bal6v4mjdoztxqyx@ethereal.email",
//     password: "9tx57vsV6fC8477K31",
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//   },
//   staticAddress: "http://localhost:3000/images/",
// };
