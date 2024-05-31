import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

const Articles = ({
  articles,
  setArticles,
  user,
  setUser,
  setNotificationMessage,
  savedArticles,
  setSavedArticles,
}) => {
  const [search, setSearch] = useState(articles);

  const navigate = useNavigate();

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
          className="text-black rounded-2xl mb-5 w-3/12"
          placeholder="Search"
        />
      </div>
      <h2 className="text-2xl underline mb-3">Articles</h2>

      {search.map((a) => (
        <div key={a.id} className="p-6 md:w-full :bg-white m-auto">
          <div>
            <h2>{a.title}</h2>
            <a href={a.url}>{a.url}</a>
          </div>

          {user.username === a.user.username && (
            <button onClick={() => navigate(`/articles/${a.id}`)}>Edit</button>
          )}

          {user && (
            <BookmarkButton
              id={a.id}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              setNotificationMessage={setNotificationMessage}
              setUser={setUser}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Articles;
