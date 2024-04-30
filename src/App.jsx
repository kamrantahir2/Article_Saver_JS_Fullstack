import { useEffect, useState, useRef } from "react";
import "./App.css";
import articleService from "./service/articles";
import Togglable from "./components/Togglable";
import Articles from "./components/Articles";
import ArticleForm from "./components/ArticleForm";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    articleService.getAll().then((response) => {
      setArticles(response);
    });
  }, []);

  return (
    <div>
      <h1>Article Saver</h1>
      <ArticleForm articles={articles} setArticles={setArticles} />
      <Articles articles={articles} setArticles={setArticles} />
    </div>
  );
}

export default App;
