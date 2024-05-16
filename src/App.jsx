import { useEffect, useRef, useState } from "react";
import "./App.css";
import articleService from "./service/articles";
import Articles from "./components/Articles";
import LoginForm from "./components/LoginForm.jsx";
import UserForm from "./components/UserForm.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Article from "./components/Article.jsx";
import LogoutButton from "./components/LogoutButton.jsx";
import ArticleForm from "./components/ArticleForm.jsx";
import Notification from "./components/Notification.jsx";

function App() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [myArticles, setMyArticles] = useState([]);
  const [message, setMessage] = useState(null);
  const [styling, setStyling] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedArticleAppUser");

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      articleService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
  }, []);

  useEffect(() => {
    setMyArticles(
      user ? articles.filter((a) => a.user.username === user.username) : []
    );
  }, []);

  const setNotificationMessage = (msg, styling) => {
    setMessage(msg);
    setStyling(styling);
    setTimeout(() => {
      setMessage(null);
      setStyling(null);
    }, 5000);
  };

  return (
    <div>
      <Notification message={message} styling={styling} />
      <div>
        <Link className="link" to="/">
          All Articles
        </Link>
        {user && (
          <Link className="link" to="/my_articles">
            My Articles
          </Link>
        )}
        {user && (
          <Link className="link" to="/add_new">
            Add New Article
          </Link>
        )}
        {user ? (
          <div>
            <em>{user.name} logged in</em>
          </div>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route
          path="/login"
          element={
            <div>
              <LoginForm
                setUser={setUser}
                setNotificationMessage={setNotificationMessage}
              />
              <UserForm setUser={setUser} />
            </div>
          }
        />

        <Route
          path="/articles/:id"
          element={
            <Article
              articles={articles}
              setArticles={setArticles}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route
          path="/my_articles"
          element={
            <Articles
              articles={myArticles}
              setArticles={setArticles}
              user={user}
              setUser={setUser}
            />
          }
        />

        <Route
          path="/add_new"
          element={
            <ArticleForm
              articles={articles}
              setArticles={setArticles}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>

      {user && <LogoutButton setUser={setUser} />}
    </div>
  );
}

export default App;
