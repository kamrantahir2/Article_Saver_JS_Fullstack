import articleService from "../service/articles.js";
import userService from "../service/users.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const BookmarkButton = ({
  id,
  savedArticles,
  setSavedArticles,
  setNotificationMessage,
  setUser,
}) => {
  const navigate = useNavigate();

  const handleSave = async (id) => {
    try {
      await articleService.verifyUser();

      const foundArticle = savedArticles.find((a) => a.id === id);

      if (!foundArticle) {
        const updatedUser = await articleService.saveArticle(id);

        userService.getUserById(updatedUser.id).then((response) => {
          setSavedArticles(response.saved);
        });

        setNotificationMessage(`Article saved`, "success");
      } else {
        setNotificationMessage(`Article has already been bookmarked`, "error");
      }
    } catch (error) {
      console.log(error);
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

  return (
    <button className="" onClick={() => handleSave(id)}>
      <FontAwesomeIcon icon={faBookmark} className="text-white" />
    </button>
  );
};

export default BookmarkButton;
