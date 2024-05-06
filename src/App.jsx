import { useEffect, useState, useRef } from "react";
import "./App.css";
import articleService from "./service/articles";
import Togglable from "./components/Togglable";
import Articles from "./components/Articles";
import ArticleForm from "./components/ArticleForm";
import loginService from "./service/login.js";
import LoginForm from "./components/LoginForm.jsx";

function App() {
  const [articles, setArticles] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
  };

  return (
    <div>
      <LoginForm setUser={setUser} />
      <button onClick={handleLogout}>Logout</button>
      <h1>Article Saver</h1>
      <ArticleForm articles={articles} setArticles={setArticles} />
      <Articles articles={articles} setArticles={setArticles} />
    </div>
  );
}

export default App;
