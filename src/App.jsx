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

  return (
    <>
      <div>
        {articles.map((a) => (
          <h3 key={a.title}>{a.title}</h3>
        ))}
      </div>
    </>
  );
}

export default App;
