import { useRef } from "react";
import Togglable from "./Togglable";
import articleService from "../service/articles";
import UpdateArticle from "./UpdateArticle";

const Articles = ({ articles, setArticles }) => {
  const articleInfoRef = useRef();

  const handleDelete = async (id) => {
    await articleService.deleteArticle(id);
    const newArticles = await articleService.getAll();
    setArticles(newArticles);
  };

  return (
    <div>
      <h2>Articles</h2>
      {articles.map((a) => (
        <div key={a.id}>
          <h3>{a.title}</h3>
          <Togglable buttonLabel="More info" ref={articleInfoRef}>
            {console.log()}
            <h5>
              URL:{" "}
              <a href={a.url} rel="noopener" target="_blank">
                {a.url}
              </a>
            </h5>
            <h5>Description: {a.description}</h5>
            <h5>Favourite: {a.favourite.toString()}</h5>
            <button onClick={() => handleDelete(a.id)}>delete</button>
            <br />
            <UpdateArticle
              articles={articles}
              title={a.title}
              description={a.description}
              url={a.url}
              favourite={a.favourite}
            />
          </Togglable>
        </div>
      ))}
    </div>
  );
};

export default Articles;
