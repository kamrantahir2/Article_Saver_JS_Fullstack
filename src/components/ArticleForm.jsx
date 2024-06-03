import { useState, useRef } from "react";
import articleService from "../service/articles";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faBook } from "@fortawesome/free-solid-svg-icons";

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
      <h2 className="text-black text-2xl underline mb-5">Add article</h2>
      <form onSubmit={addArticle}>
        <div>
          <label className="input input-ghost w-9/12 lg:w-5/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FontAwesomeIcon icon={faPen} className="text-black" />
          </label>
        </div>
        <div>
          <label className="input input-ghost w-9/12 lg:w-5/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
            />
            <FontAwesomeIcon icon={faLink} className="text-black" />
          </label>
        </div>
        <div>
          <label className="input input-ghost w-9/12 lg:w-5/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <FontAwesomeIcon icon={faBook} className="text-black" />
          </label>
        </div>

        <div>
          <button
            className="mt-5 w-9/12 lg:w-5/12 hover:bg-gray-800 "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
