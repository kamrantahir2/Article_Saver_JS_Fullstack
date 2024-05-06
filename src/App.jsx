import { useEffect, useState, useRef } from "react";
import "./App.css";
import articleService from "./service/articles";
import Togglable from "./components/Togglable";
import Articles from "./components/Articles";
import ArticleForm from "./components/ArticleForm";
import loginService from "./service/login.js";

function App() {
  const [articles, setArticles] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await loginService.login({ username, password });

    setUser(user);

    if (!user) {
      console.log("Wrong username or password");
    }

    console.log("USER: ", user);

    setUsername("");
    setPassword("");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
  };

  return (
    <div>
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
      <button onClick={handleLogout}>Logout</button>
      <h1>Article Saver</h1>
      <ArticleForm articles={articles} setArticles={setArticles} />
      <Articles articles={articles} setArticles={setArticles} />
    </div>
  );
}

export default App;
