import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import articleService from "./service/articles";

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
    <>
      <div>
        {articles.map((a) => (
          <div key={a.id}>
            <h3>{a.title}</h3>
            <h4>{a.id}</h4>
            <button onClick={() => handleDelete(a.id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
