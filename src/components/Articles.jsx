import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Articles = ({ articles, setArticles, user, setUser, setMessage }) => {
  const [search, setSearch] = useState(articles);

  useEffect(() => {
    setSearch(articles);
  }, [articles]);

  const handleSearch = (event) => {
    setSearch(
      articles.filter((a) =>
        a.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Articles</h2>
      <label htmlFor="searchInput">Search: </label>
      <input type="text" id="searchInput" onChange={handleSearch} />
      {search.map((a) => (
        <Link key={a.id} to={`/articles/${a.id}`}>
          <h3>{a.title}</h3>
          <h4 style={{ marginTop: -20 }}>Added by {a.user.username}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Articles;
