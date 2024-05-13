import { useEffect, useState, useRef } from "react";
import "./App.css";
import articleService from "./service/articles";
import Articles from "./components/Articles";
import ArticleForm from "./components/ArticleForm";
import LoginForm from "./components/LoginForm.jsx";
import UserForm from "./components/UserForm.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
    return (
      <div>
        <LoginForm setUser={setUser} />
        <UserForm setUser={setUser} />
      </div>
    );
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

  // return (
  //   <div>
  //     <h1>Article Saver</h1>

  //     {user === null ? (
  //       loginForm()
  //     ) : (
  //       <div>
  //         <p>{user.name} logged in</p>
  //         {articleForm()}
  //       </div>
  //     )}

  // <button className="btn" onClick={handleLogout}>
  //   Logout
  // </button>

  // <Articles
  //   articles={articles}
  //   setArticles={setArticles}
  //   user={user}
  //   setUser={setUser}
  // />
  //   </div>
  // );

  return (
    <Router>
      {!user && loginForm()}
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
      <div>
        <Link className="link" to="/">
          All Articles
        </Link>
        <Link className="link" to="/articles">
          My Articles
        </Link>
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
          path="/articles"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
