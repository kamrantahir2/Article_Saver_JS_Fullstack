import express from "express";
const app = express();

let articles = [
  {
    id: 1,
    title: "Using the Postgres.js library",
    description: "How to use PostgreSQL with JS",
    url: "https://dev.to/opeoginni/how-to-use-the-postgresjs-library-jh",
    favourite: true,
  },
  {
    id: 2,
    title: "How to use JSON Web Token (JWT) in Node.js",
    description: "JSON Web Token tutorial",
    url: "https://codedamn.com/news/nodejs/use-json-web-token-jwt-in-nodejs",
    favourite: false,
  },
  {
    id: 3,
    title: "Understanding Redux: A tutorial with examples",
    descirption: "Redux tutorial",
    url: "https://blog.logrocket.com/understanding-redux-tutorial-examples/",
    favourite: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/articles", (request, response) => {
  response.json(articles);
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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
