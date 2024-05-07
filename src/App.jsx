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

  const loginForm = () => {
    return <LoginForm setUser={setUser} />;
  };

  const articleForm = () => {
    return <ArticleForm articles={articles} setArticles={setArticles} />;
  };

  return (
    <div>
      <h1>Article Saver</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {articleForm()}
        </div>
      )}
      <Articles articles={articles} setArticles={setArticles} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
