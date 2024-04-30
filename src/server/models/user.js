import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});

const User = returnedObject.passwordHash;

export default User;
