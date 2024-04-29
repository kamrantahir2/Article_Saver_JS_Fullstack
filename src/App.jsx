import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import articleService from "./service/articles";
import Togglable from "./components/Togglable";

function App() {
  const [articles, setArticles] = useState([]);
  const articleInfoRef = useRef();

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
            <Togglable buttonLabel="More info" ref={articleInfoRef}>
              <h5>{a.url}</h5>
              <h5>{a.description}</h5>
              <button onClick={() => handleDelete(a.id)}>delete</button>
              <br />
            </Togglable>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
