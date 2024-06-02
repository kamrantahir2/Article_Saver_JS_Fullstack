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
    <div className="">
      <div>
        <input
          type="text"
          id="searchInput"
          onChange={handleSearch}
          className="text-black rounded-2xl mb-5 w-6/12"
          placeholder="Search"
        />
      </div>
      <h2 className="text-4xl text-black mt-9 mb-9 underline mb-3">Articles</h2>

      <div className="border-t-2 border-black w-100 md:w-6/12 m-auto"></div>

      {search.map((a) => (
        <div
          key={a.id}
          className="p-6 w-100 m-auto md:w-6/12 border-b-2  border-black"
        >
          <div className="p-3">
            <h2 className="text-lg mb-5 text-black underline tracking-tight ">
              {a.title}
            </h2>
            <a className="text-black " href={a.url}>
              {a.url}
            </a>
          </div>

          {user && (
            <div className="card-actions  mt-3 justify-center">
              {user.username === a.user.username && (
                <button
                  className=""
                  onClick={() => navigate(`/articles/${a.id}`)}
                >
                  Edit
                </button>
              )}
              <div className="">
                <BookmarkButton
                  id={a.id}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                  setNotificationMessage={setNotificationMessage}
                  setUser={setUser}
                />
              </div>
            </div>
          )}
          {/* <div className="w-6/12 h-1 bg-white rounded-xl m-auto mt-10"></div> */}
        </div>
      ))}
    </div>
  );
};

export default Articles;
