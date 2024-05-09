import { useState, useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";

const ArticleForm = ({ setArticles, articles, user, setUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [favourite, setFavourite] = useState(false);
  const newArticleRef = useRef();

  const addArticle = async (e) => {
    try {
      e.preventDefault();
      const newArticle = {
        title: title,
        description: description,
        url: url,
        favourite: favourite,
      };

      const savedArticle = await articleService.create(newArticle);

      console.log("saved article: ", savedArticle);

      setArticles(articles.concat(savedArticle));

      setTitle("");
      setDescription("");
      setUrl("");
    } catch (error) {
      console.log(error);
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
      }
    }
  };

  return (
    <div>
      <Togglable buttonLabel="Save article" ref={newArticleRef}>
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
            <p>Favourite:</p>
            True
            <input
              type="radio"
              name="favourite"
              value={true}
              onClick={(e) => setFavourite(true)}
            />{" "}
            False
            <input
              type="radio"
              name="favourite"
              value={false}
              defaultChecked
              onClick={(e) => setFavourite(false)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Togglable>
    </div>
  );
};

export default ArticleForm;
