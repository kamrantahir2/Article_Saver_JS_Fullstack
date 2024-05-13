import { useState, useRef } from "react";
import userService from "../service/users.js";
import Togglable from "./Togglable.jsx";
import loginService from "../service/login.js";
import articleService from "../service/articles.js";
import { useNavigate } from "react-router-dom";

const UserForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      name,
      password,
    };

    await userService.addUser(newUser);

    const user = { username, password };

    const loggedInUser = await loginService.login(user);

    window.localStorage.setItem(
      "loggedArticleAppUser",
      JSON.stringify(loggedInUser)
    );

    articleService.setToken(loggedInUser.token);
    setUser(loggedInUser);

    setUsername("");
    setName("");
    setPassword("");
    navigate("/");
  };

  return (
    <Togglable buttonLabel="Register User">
      <form onSubmit={handleCreate}>
        <h4>Register</h4>
        <div>
          <label htmlFor="nameInput">Name: </label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="usernameInput">Username: </label>
          <input
            type="text"
            id="usernameInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="passwordInput">Password: </label>
          <input
            type="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Togglable>
  );
};

export default UserForm;
