import { useState, useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";

const UpdateArticle = ({
  article,
  articles,
  setArticles,
  user,
  setUser,
  setNotificationMessage,
}) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [url, setUrl] = useState(article.url);
  const updatedArticleRef = useRef();
  const handleUpdate = async (e, id) => {
    try {
      e.preventDefault();

      const updatedArticle = {
        title: title,
        description: description,
        url: url,
      };

      const returnedArticle = await articleService.update(id, updatedArticle);

      setArticles(
        articles.map((a) => (a.id !== returnedArticle.id ? a : returnedArticle))
      );
      updatedArticleRef.current.toggleVisibility();
      setNotificationMessage(`Article '${article.title}' updated`, "success");
    } catch (error) {
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
        setNotificationMessage(
          "Login expired, please log in and try again",
          "error"
        );
      } else if (error.response.data.error.includes("Validation error")) {
        setNotificationMessage(
          "Title and URL must be longer than 3 characters",
          "error"
        );
      }
    }
  };

  return (
    <Togglable buttonLabel="Update" ref={updatedArticleRef}>
      <h3 className="text-black text-xl underline my-6">Update Article</h3>

      <form
        onSubmit={(e) => handleUpdate(e, article.id)}
        className="text-black"
      >
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
          <button className="text-white my-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Togglable>
  );
};

export default UpdateArticle;
