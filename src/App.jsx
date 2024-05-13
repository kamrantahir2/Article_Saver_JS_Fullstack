import { useEffect, useState, useRef } from "react";
import "./App.css";
import articleService from "./service/articles";
import Articles from "./components/Articles";
import LoginForm from "./components/LoginForm.jsx";
import UserForm from "./components/UserForm.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Article from "./components/Article.jsx";
import { Navigate } from "react-router-dom";
import LogoutButton from "./components/LogoutButton.jsx";

function App() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [myArticles, setMyArticles] = useState([]);

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

  useEffect(() => {
    if (user) {
      setMyArticles(articles.filter((a) => a.user.username === user.username));
    }
  }, [articles]);

  return (
    <Router>
      <div>
        <Link className="link" to="/">
          All Articles
        </Link>
        <Link className="link" to="/my_articles">
          My Articles
        </Link>
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
              <LoginForm setUser={setUser} />
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
            user ? (
              <Articles
                articles={myArticles}
                setArticles={setArticles}
                user={user}
                setUser={setUser}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>

      {user && <LogoutButton setUser={setUser} />}
    </Router>
  );
}

export default App;
