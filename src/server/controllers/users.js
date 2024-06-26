import bcrypt from "bcrypt";
import express from "express";
const usersRouter = express.Router();
import User from "../models/user.js";

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("articles", { title: 1, url: 1 });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id).populate("saved", {
    title: 1,
    description: 1,
    url: 1,
  });
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default usersRouter;
