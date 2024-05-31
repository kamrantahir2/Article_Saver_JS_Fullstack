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
      <h2 className="text-lg">Articles</h2>
      <div>
        <input
          type="text"
          id="searchInput"
          onChange={handleSearch}
          className="text-black rounded-2xl"
          placeholder="Search"
        />
      </div>
      {search.map((a) => (
        <div
          key={a.id}
          className="my-6 border-2 border-black p-9 rounded-2xl shadow-lg bg-blend-darken bg-gray-900"
        >
          <Link key={a.id} to={`/articles/${a.id}`}>
            <h3 className="">{a.title}</h3>
            <h4>Added by {a.user.username}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Articles;
