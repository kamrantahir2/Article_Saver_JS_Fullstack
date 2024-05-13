import Togglable from "./Togglable.jsx";
import { useRef } from "react";
import articleService from "../service/articles.js";
import { useParams } from "react-router-dom";
import UpdateArticle from "./UpdateArticle.jsx";

const Article = ({ articles, setArticles, user, setUser }) => {
  const articleInfoRef = useRef();

  const id = useParams().id;

  const article = articles.find((a) => a.id === id);
  console.log(article);

  const handleDelete = async (id) => {
    try {
      await articleService.deleteArticle(id);
      const newArticles = await articleService.getAll();
      setArticles(newArticles);
    } catch (error) {
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
      }
    }
  };

  return (
    <div key={article.id}>
      <h3>{article.title}</h3>

      <h5>
        URL:{" "}
        <a href={article.url} rel="noopener" target="_blank">
          {article.url}
        </a>
      </h5>
      <h5>Description: {article.description}</h5>
      <h5>Favourite: {article.favourite.toString()}</h5>
      <h5>User: {article.user.username}</h5>
      <button onClick={() => handleDelete(a.id)}>Delete</button>
      <UpdateArticle
        articles={articles}
        setArticles={setArticles}
        article={article}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default Article;
