import { useEffect, useState, useRef } from "react";
import "./App.css";
import articleService from "./service/articles";
import Togglable from "./components/Togglable";
import Articles from "./components/Articles";
import ArticleForm from "./components/ArticleForm";

function App() {
  const [articles, setArticles] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Logging in with ", username, password);
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

      <h1>Article Saver</h1>
      <ArticleForm articles={articles} setArticles={setArticles} />
      <Articles articles={articles} setArticles={setArticles} />
    </div>
  );
}

export default App;
