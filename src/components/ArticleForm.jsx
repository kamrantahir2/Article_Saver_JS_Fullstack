import { useState, useRef } from "react";
import articleService from "../service/articles";
import { useNavigate } from "react-router-dom";

const ArticleForm = ({
  setArticles,
  articles,
  user,
  setUser,
  setNotificationMessage,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const addArticle = async (e) => {
    try {
      e.preventDefault();
      const newArticle = {
        title: title,
        description: description,
        url: url,
      };

      const savedArticle = await articleService.create(newArticle);

      setArticles(articles.concat(savedArticle));
      setTitle("");
      setDescription("");
      setUrl("");
      navigate("/my_articles");
      setNotificationMessage(
        `Article '${savedArticle.title}' saved`,
        "success"
      );
    } catch (error) {
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
        setNotificationMessage(
          "Login expired, please log in and try again",
          "error"
        );
      } else if (error.response.data.error.includes("missing content")) {
        setNotificationMessage("Article must have a title and URL", "error");
      } else if (error.response.data.error.includes("Validation error")) {
        setNotificationMessage(
          "Title and URL must be longer than 3 characters",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <h2>Save article</h2>
      <form onSubmit={addArticle}>
        Title:{" "}
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        Description:{" "}
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        URL:
        <div>
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
