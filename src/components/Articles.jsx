import { useRef } from "react";
import Togglable from "./Togglable";

const Articles = ({ articles }) => {
  const articleInfoRef = useRef();

  return (
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
  );
};

export default Articles;
