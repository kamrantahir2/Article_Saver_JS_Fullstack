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
import NotLoggedInInfo from "./components/NotLoggedInInfo.jsx";
import MyArticles from "./components/MyArticles.jsx";
import SavedArticles from "./components/SavedArticles.jsx";
import usersService from "./service/users.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [styling, setStyling] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedArticleAppUser");

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      usersService.getUserById(user.id).then((response) => {
        setSavedArticles(response.saved);
      });
      setUser(user);

      articleService.setToken(user.token);
    }
  }, []);

  // useEffect(() => {
  //   usersService.getUserById(user.id).then((response) => {});
  // }, []);

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
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
    <div className="font-sans bg-yellow-50 text-gray-200 rounded-lg min-h-screen">
      {!user && <NotLoggedInInfo />}

      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="text-white" to="/">
                  All Articles
                </Link>
              </li>
              <li>
                {user ? (
                  <Link className="text-white" to="/my_articles">
                    My Articles
                  </Link>
                ) : (
                  <div className="hidden"></div>
                )}
              </li>
              <li>
                {user ? (
                  <Link className="text-white" to="/bookmark">
                    Bookmark
                  </Link>
                ) : (
                  <div className="hidden"></div>
                )}
              </li>
              <li>
                {user && (
                  <Link className="text-white" to="/add_new">
                    Add New Article
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div>
            <Link className="ml-3 text-white" to="/">
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link className="text-white" to="/">
                  All Articles
                </Link>
              </li>
              <li>
                {user && (
                  <Link className="text-white" to="/my_articles">
                    My Articles
                  </Link>
                )}
              </li>
              <li>
                {user && (
                  <Link className="text-white" to="/bookmark">
                    Bookmark
                  </Link>
                )}
              </li>
              <li>
                {user && (
                  <Link className="text-white" to="/add_new">
                    Add New Article
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          {user ? (
            <div>
              <em className="text-white">{user.name} logged in</em>
            </div>
          ) : (
            <Link className="text-white mr-5" to="/login">
              Login
            </Link>
          )}

          {user && (
            <div className="ml-3">
              <LogoutButton
                setUser={setUser}
                setNotificationMessage={setNotificationMessage}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Notification message={message} styling={styling} />
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
              setNotificationMessage={setNotificationMessage}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              title="All Articles"
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
              <UserForm
                setUser={setUser}
                setNotificationMessage={setNotificationMessage}
              />
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
              setNotificationMessage={setNotificationMessage}
              setSavedArticles={setSavedArticles}
              savedArticles={savedArticles}
            />
          }
        />

        <Route
          path="/bookmark"
          element={
            <SavedArticles
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              setUser={setUser}
              setNotificationMessage={setNotificationMessage}
              user={user}
            />
          }
        />

        <Route
          path="/my_articles"
          element={
            <MyArticles
              articles={articles}
              setArticles={setArticles}
              user={user}
              setUser={setUser}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              setNotificationMessage={setNotificationMessage}
              title="My Articles"
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
              setNotificationMessage={setNotificationMessage}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
