import express from "express";
const app = express();

let articles = [
  {
    title: "Using the Postgres.js library",
    description: "How to use PostgreSQL with JS",
    url: "https://dev.to/opeoginni/how-to-use-the-postgresjs-library-jh",
    favourite: true,
  },
  {
    title: "How to use JSON Web Token (JWT) in Node.js",
    description: "JSON Web Token tutorial",
    url: "https://codedamn.com/news/nodejs/use-json-web-token-jwt-in-nodejs",
    favourite: false,
  },
  {
    title: "Understanding Redux: A tutorial with examples",
    descirption: "Redux tutorial",
    url: "https://blog.logrocket.com/understanding-redux-tutorial-examples/",
    favourite: true,
  },
];
