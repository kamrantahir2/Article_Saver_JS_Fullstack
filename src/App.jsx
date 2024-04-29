import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import articleService from "./service/articles";
import Togglable from "./components/Togglable";
import Articles from "./components/Articles";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
  }, []);

  const handleDelete = async (id) => {
    await articleService.deleteArticle(id);
    const newArticles = await articleService.getAll();
    setArticles(newArticles);
  };

  return (
    <div>
      <Articles articles={articles}></Articles>
    </div>
  );
}

export default App;
