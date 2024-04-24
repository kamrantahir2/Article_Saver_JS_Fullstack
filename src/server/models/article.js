import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  description: String,
  url: {
    type: String,
    minLength: 3,
    required: true,
  },
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

export default Article;
