import express from "express";
const app = express();
import mongoose from "mongoose";
import articlesRouter from "./controllers/articles.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import middleware from "./utils/middleware.js";
import usersRouter from "./controllers/users.js";

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("conneected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

// MIDDLEWARE FUNCTIONS

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

export default app;
