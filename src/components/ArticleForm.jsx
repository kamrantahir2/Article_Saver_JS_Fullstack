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
      <h2 className="text-black text-2xl underline mb-5">Add article</h2>
      <form onSubmit={addArticle}>
        <div>
          <label className="input input-ghost w-9/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
        </div>
        <div>
          <label className="input input-ghost w-9/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
        </div>
        <div>
          <label className="input input-ghost w-9/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill=""
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div>
          <button className="mt-5" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
