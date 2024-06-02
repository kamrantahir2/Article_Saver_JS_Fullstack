import { useState } from "react";
import loginService from "../service/login.js";
import articleService from "../service/articles.js";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedArticleAppUser", JSON.stringify(user));

      articleService.setToken(user.token);
      setUser(user);

      setUsername("");
      setPassword("");
      navigate("/");
      setNotificationMessage(`Logged in as ${user.username}`, "success");
    } catch (error) {
      setNotificationMessage("Wrong username or password", "error");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form className="mt-6" onSubmit={handleLogin}>
      <h4 className="text-black text-2xl mb-4 underline">Log in</h4>

      <label className="">Username: </label>
      <input
        className="inp"
        type="text"
        value={username}
        name="username"
        onChange={({ target }) => setUsername(target.value)}
        id="username"
      />

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
