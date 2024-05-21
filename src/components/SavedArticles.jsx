import articleService from "../service/articles.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SavedArticles = ({
  savedArticles,
  setSavedArticles,
  setUser,
  setNotificationMessage,
  user,
}) => {
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      const updatedUser = await articleService.unsaveArticle(id);
      setUser(updatedUser);
      setSavedArticles(updatedUser.saved);
    } catch (error) {
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
        setNotificationMessage(
          "Login expired, please log in and try again",
          "error"
        );
        navigate("/login");
      }
    }
  };
  return (
    <div>
      <h2>Articles</h2>
      {savedArticles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>

          <h5>
            URL:{" "}
            <a href={article.url} rel="noopener" target="_blank">
              {article.url}
            </a>
          </h5>
          <h5>Description: {article.description}</h5>
          <button onClick={() => handleRemove(article.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedArticles;
