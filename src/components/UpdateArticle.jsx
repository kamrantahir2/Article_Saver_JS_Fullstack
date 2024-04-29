import { useState, useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";

const UpdateArticle = ({ article, articles }) => {
  const [updatedTitle, setUpdatedTitle] = useState(article.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    article.description
  );
  const [updatedUrl, setUpdatedUrl] = useState(article.url);
  const [updatedFavourite, setUpdatedFavourite] = useState(article.favourite);

  const handleUpdate = () => {};

  return (
    <div>
      <form onSubmit={handleUpdate}></form>
    </div>
  );
};

export default UpdateArticle;
