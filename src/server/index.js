import express from "express";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(cors());

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  favourite: Boolean,
});

articleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Article = mongoose.model("Article", articleSchema);

const generateId = () => {
  const maxId =
    articles.length > 0 ? Math.max(...articles.map((a) => a.id)) : 0;

  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/articles", (request, response) => {
  Article.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/articles/:id", (request, response) => {
  const id = Number(request.params.id);
  const article = articles.find((article) => article.id === id);

  if (article) {
    response.send(article);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/articles/:id", (request, response) => {
  const id = Number(request.params.id);
  articles = articles.filter((a) => a.id !== id);
  response.status(204).end();
});

app.post("/api/articles", (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "missing content",
    });
  }

  const article = {
    id: generateId(),
    title: body.title,
    description: body.description,
    url: body.url,
    favourite: Boolean(body.favourite) || false,
  };

  articles = articles.concat(article);

  response.json(article);
});

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unkownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
