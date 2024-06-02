import Articles from "./Articles";

const MyArticles = ({
  articles,
  setArticles,
  user,
  setUser,
  savedArticles,
  setSavedArticles,
  setNotificationMessage,
  title,
}) => {
  const myArticles = articles.filter((a) => a.user.username === user.username);

  return (
    <Articles
      articles={myArticles}
      setArticles={setArticles}
      user={user}
      setUser={setUser}
      savedArticles={savedArticles}
      setSavedArticles={setSavedArticles}
      setNotificationMessage={setNotificationMessage}
      title={title}
    />
  );
};

export default MyArticles;
