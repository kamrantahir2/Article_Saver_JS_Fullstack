import express from "express";
import cors from "cors";
const app = express();
import Article from "./models/article.js";

app.use(express.json());
app.use(cors());

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

app.put("/api/articles/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  const article = {
    title: body.title,
    description: body.description,
    url: body.url,
    favourite: body.favourite,
  };

  Article.findByIdAndUpdate(id, article, { new: true })
    .then((updatedArticle) => {
      response.json(updatedArticle);
    })
    .catch((error) => next(error));
});

app.delete("/api/articles/:id", (request, response, next) => {
  const id = request.params.id;
  Article.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/articles", (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "missing content",
    });
  }

  const article = new Article({
    title: body.title,
    description: body.description,
    url: body.url,
    favourite: Boolean(body.favourite) || false,
  });

  article.save().then((savedArticle) => {
    response.json(savedArticle);
  });
});

// MIDDLEWARE FUNCTIONS

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });

    next(error);
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
};

app.use(unkownEndpoint);
app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
