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
      <div>
        <input
          type="text"
          id="searchInput"
          onChange={handleSearch}
          className="text-black rounded-2xl w-full mb-5"
          placeholder="Search"
        />
      </div>
      <h2 className="text-2xl underline mb-3">Articles</h2>

      {search.map((a) => (
        <div
          key={a.id}
          className="my-6 border-2 border-black p-9 rounded-2xl shadow-xl bg-blend-darken bg-gray-900"
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
