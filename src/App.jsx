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

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedArticleAppUser");

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      articleService.setToken(user.token);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedArticleAppUser");
    setUser(null);
  };

  const loginForm = () => {
    return <LoginForm setUser={setUser} />;
  };

  const articleForm = () => {
    return (
      <ArticleForm
        articles={articles}
        setArticles={setArticles}
        user={user}
        setUser={setUser}
      />
    );
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
      <Articles
        articles={articles}
        setArticles={setArticles}
        user={user}
        setUser={setUser}
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
