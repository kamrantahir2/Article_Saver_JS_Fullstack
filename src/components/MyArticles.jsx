import { useState, useEffect } from "react";
import Articles from "./Articles.jsx";

const MyArticles = ({ articles, setArticles, user, setUser }) => {
  const [myArticles, setMyArticles] = useState([]);

  useEffect(() => {
    setMyArticles(articles.filter((a) => a.user.username === user.username));
  }, []);

  return (
    <Articles
      articles={myArticles}
      setArticles={setArticles}
      user={user}
      setUser={setUser}
    />
  );
};

export default MyArticles;
