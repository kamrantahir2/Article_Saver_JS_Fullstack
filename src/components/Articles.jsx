import { useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";
import UpdateArticle from "./UpdateArticle";
import User from "../server/models/user";
import userService from "../service/users";
import { Link } from "react-router-dom";

const Articles = ({ articles, setArticles, user, setUser }) => {
  return (
    <div>
      <h2>Articles</h2>
      {articles.map((a) => (
        <Link key={a.id} to={`/articles/${a.id}`}>
          <h3>{a.title}</h3>
          <h4 style={{ marginTop: -20 }}>Added by {a.user.username}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Articles;
