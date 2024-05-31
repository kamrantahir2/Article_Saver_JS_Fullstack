import articleService from "../service/articles.js";
import { useMatch } from "react-router-dom";
import UpdateArticle from "./UpdateArticle.jsx";
import { useNavigate } from "react-router-dom";
import userService from "../service/users.js";

const LoggedInComponents = ({
  articles,
  setArticles,
  user,
  setUser,
  article,
  setNotificationMessage,
  children,
}) => {
  if (user) {
    const handleDelete = async (id) => {
      try {
        await articleService.deleteArticle(id);
        const newArticles = await articleService.getAll();
        setArticles(newArticles);
        navigate("/my_articles");
        setNotificationMessage("Article successfully deleted", "success");
      } catch (error) {
        if (error.response.data.error.includes("Token Expired")) {
          window.localStorage.removeItem("loggedArticleAppUser");
          setUser(null);
          setNotificationMessage(
            "Login expired, please log in and try again",
            "error"
          );
        }
      }
    };

    return (
      <div className="flex justify-center space-x-5 mt-4">
        {user.username === article.user.username && (
          <button onClick={() => handleDelete(article.id)}>Delete</button>
        )}
        {user.username === article.user.username && (
          <UpdateArticle
            articles={articles}
            setArticles={setArticles}
            article={article}
            user={user}
            setUser={setUser}
            setNotificationMessage={setNotificationMessage}
          />
        )}
        {children}
      </div>
    );
  }
};

const Article = ({
  articles,
  setArticles,
  user,
  setUser,
  setNotificationMessage,
  setSavedArticles,
  savedArticles,
}) => {
  const navigate = useNavigate();

  const match = useMatch("/articles/:id");
  const article = match ? articles.find((a) => a.id === match.params.id) : null;

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div key={article.id} className="h-screen">
      <div className="">
        <h3 className="">{article.title}</h3>

        <h5>
          URL:{" "}
          <a
            className="font-sans"
            href={article.url}
            rel="noopener"
            target="_blank"
          >
            {article.url}
          </a>
        </h5>
        <h5 className="">Description: {article.description}</h5>
        <h5 className="">Saved by: {article.user.username}</h5>
        <LoggedInComponents
          articles={articles}
          setArticles={setArticles}
          user={user}
          setUser={setUser}
          article={article}
          setNotificationMessage={setNotificationMessage}
        ></LoggedInComponents>
      </div>
    </div>
  );
};

export default Article;
