import articleService from "../service/articles.js";
import { useMatch } from "react-router-dom";
import UpdateArticle from "./UpdateArticle.jsx";
import { useNavigate } from "react-router-dom";

const Article = ({ articles, setArticles, user, setUser }) => {
  const navigate = useNavigate();

  const match = useMatch("/articles/:id");
  const article = match ? articles.find((a) => a.id === match.params.id) : null;

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    try {
      await articleService.deleteArticle(id);
      const newArticles = await articleService.getAll();
      setArticles(newArticles);
      navigate("/my_articles");
    } catch (error) {
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
      }
    }
  };

  return (
    <>
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
        {user.username === article.user.username && (
          <button onClick={() => handleDelete(article.id)}>Delete</button>
        )}
        {user.username === article.user.username && (
          <UpdateArticle
            articles={articles}
            setArticles={setArticles}
            article={article}
            user={user}
            setUser={setUser}
          />
        )}
      </div>
    </>
  );
};

export default Article;
