import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  favourite: Boolean,
});

const Article = mongoose.model("Article", articleSchema);

const article = new Article({
  title: "Understanding Redux: A tutorial with examples",
  description: "Redux tutorial",
  url: "https://blog.logrocket.com/understanding-redux-tutorial-examples/",
  favourite: true,
});

// Article.find({}).then((result) => {
//   result.forEach((article) => {
//     console.log(article);
//   });
//   mongoose.connection.close();
// });

Article.find({ favourite: true }).then((result) => {
  result.forEach((a) => {
    console.log(a);
  });
  mongoose.connection.close();
});

// article.save().then((result) => {
//   console.log("article saved!");
//   mongoose.connection.close();
// });
