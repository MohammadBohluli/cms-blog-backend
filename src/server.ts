import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import articleController from "./articles/articleControllers";
import userController from "./users/userControllers";

// config
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// rout group
app.use("/api/users", userController);
app.use("/api/articles", articleController);

// server start
app.listen(PORT, () => {
  console.log(`🔥 Server is Running on port: ${PORT}`);
});
