import express from "express";
const articlesRouter = express.Router();
import Article from "../models/article.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    return token;
  }
  return null;
};

articlesRouter.get("/", async (request, response) => {
  const articles = await Article.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(articles);
});

articlesRouter.get("/:id", (request, response) => {
  const id = request.params.id;
  Article.findById(id)
    .populate("user", {
      username: 1,
      name: 1,
    })
    .then((article) => {
      if (article) {
        response.json(article);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

articlesRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  Article.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

articlesRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    if (!body.title || !body.url) {
      return response.status(400).json({
        error: "missing content",
      });
    }

    const user = await User.findById(decodedToken.id);

    const article = new Article({
      title: body.title,
      description: body.description,
      url: body.url,
      favourite: Boolean(body.favourite) || false,
      user: user.id,
    });

    const savedArticle = await article.save();

    const foundSavedArticle = await Article.findOne(savedArticle).populate(
      "user",
      { username: 1, name: 1 }
    );

    user.articles = user.articles.concat(foundSavedArticle._id);
    await user.save();
    response.json(foundSavedArticle);
  } catch (error) {
    next(error);
  }
});

articlesRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "missing content",
    });
  }

  const article = {
    title: body.title,
    description: body.description,
    url: body.url,
    favourite: body.favourite,
  };

  Article.findByIdAndUpdate(id, article, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedArticle) => {
      response.json(updatedArticle);
    })
    .catch((error) => next(error));
});

export default articlesRouter;
