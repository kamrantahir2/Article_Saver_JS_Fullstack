import { useState, useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";

const UpdateArticle = ({ article, articles, setArticles }) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [url, setUrl] = useState(article.url);
  const [favourite, setFavourite] = useState(article.favourite);
  const updatedArticleRef = useRef();

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const updatedArticle = {
      title: title,
      description: description,
      url: url,
      favourite: favourite,
    };

    const returnedArticle = await articleService.update(id, updatedArticle);

    setArticles(
      articles.map((a) => (a.id !== returnedArticle.id ? a : returnedArticle))
    );
    console.log("returnedArticle: ", returnedArticle);
    updatedArticleRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel="Update" ref={updatedArticleRef}>
      <form onSubmit={(e) => handleUpdate(e, article.id)}>
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
  );
};

export default UpdateArticle;
