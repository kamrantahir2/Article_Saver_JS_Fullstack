import express from "express";
const articlesRouter = express.Router();
import Article from "../models/article.js";
import User from "../models/user.js";

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

articlesRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "missing content",
    });
  }

  const user = await User.findById(body.userId);

  const article = new Article({
    title: body.title,
    description: body.description,
    url: body.url,
    favourite: Boolean(body.favourite) || false,
    user: user.id,
  });

  const savedArticle = await article.save();
  user.articles = user.articles.concat(savedArticle._id);
  await user.save();
  response.json(savedArticle);
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
