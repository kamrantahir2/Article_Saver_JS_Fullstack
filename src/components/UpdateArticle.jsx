import { useState, useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";

const UpdateArticle = ({ title, description, url, favourite, articles }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDezscription, setUpdatedDescription] = useState(description);
  const [updatedUrl, setUpdatedUrl] = useState(url);
  const [updatedFavourite, setUpdatedFavourite] = useState(favourite);
};

export default UpdateArticle;
