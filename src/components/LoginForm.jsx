import { useState } from "react";
import loginService from "../service/login.js";
import articleService from "../service/articles.js";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await loginService.login({ username, password });

    window.localStorage.setItem("loggedArticleAppUser", JSON.stringify(user));

    articleService.setToken(user.token);
    setUser(user);

    if (!user) {
      console.log("Wrong username or password");
    }

    console.log("USER: ", user);

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
