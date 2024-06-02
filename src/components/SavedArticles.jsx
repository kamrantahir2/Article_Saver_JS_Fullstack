import articleService from "../service/articles.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userService from "../service/users.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const SavedArticles = ({
  savedArticles,
  setSavedArticles,
  setUser,
  setNotificationMessage,
  user,
}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState(savedArticles);

  useEffect(() => {
    setSearch(savedArticles);
  }, [savedArticles]);

  const handleSearch = (event) => {
    setSearch(
      savedArticles.filter((a) =>
        a.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleRemove = async (id) => {
    try {
      await setSavedArticles(savedArticles.filter((a) => a.id !== id));
      await articleService.unsaveArticle(id);
      setNotificationMessage(`Article bookmark removed`, "success");
    } catch (error) {
      if (error.response.data.error.includes("Token Expired")) {
        window.localStorage.removeItem("loggedArticleAppUser");
        setUser(null);
        setNotificationMessage(
          "Login expired, please log in and try again",
          "error"
        );
        navigate("/login");
      }
    }
  };

  if (!savedArticles) {
    return <div>loading...</div>;
  }

  return (
    <div className="text-black">
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
      <h2 className="text-2xl my-6 underline">Bookmarked Articles</h2>

      <div className="border-t-2 border-black w-6/12 md:w-6/12 m-auto mt-14"></div>

      {savedArticles.length === 0 && (
        <h2 className="mt-5 text-lg text-cyan-800">No bookmarked articles</h2>
      )}

      {search.map((article) => (
        <div key={article.id}>
          <h3 className="mt-7 mb-3 text-xl underline">{article.title}</h3>

          <h5 className="">
            <a href={article.url} rel="noopener" target="_blank">
              {article.url}
            </a>
          </h5>
          <h5 className="my-3">Description: {article.description}</h5>
          <button
            className="text-white"
            onClick={() => handleRemove(article.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <div className="border-t-2 mt-8 border-black w-100 md:w-6/12 m-auto"></div>
        </div>
      ))}
      <div className="border-t-2 border-black w-6/12 md:w-6/12 m-auto mt-14"></div>
    </div>
  );
};

export default SavedArticles;
