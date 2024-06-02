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
    <div className="mt-16">
      <div>
        <label className="input input-ghost w-9/12 m-auto bg-transparent flex items-center gap-2">
          <input
            type="text"
            id="searchInput"
            onChange={handleSearch}
            className="text-black rounded-2xl mb-5 w-6/12 grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill=""
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <h2 className="text-4xl text-black mt-9 mb-9 underline ">Articles</h2>

      <div className="border-t-2 border-black w-100 md:w-6/12 m-auto"></div>

      {search.map((a) => (
        <div
          key={a.id}
          className="p-6 w-100 m-auto md:w-6/12 border-b-2  border-black"
        >
          <div className="p-3">
            <h2 className="text-xl mb-5 text-black  tracking-tight ">
              {a.title}
            </h2>
            <a className="text-black underline" href={a.url}>
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
