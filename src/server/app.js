import express from "express";
const app = express();
import mongoose from "mongoose";
import articlesRouter from "./controllers/articles.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

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

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
};

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/articles", articlesRouter);

app.use(unkownEndpoint);
app.use(errorHandler);

export default app;
