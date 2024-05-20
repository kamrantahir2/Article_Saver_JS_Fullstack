import Articles from "./Articles";

const MyArticles = ({ articles, setArticles, user, setUser }) => {
  const myArticles = articles.filter((a) => a.user.username === user.username);

  return (
    <Articles
      articles={myArticles}
      setArticles={setArticles}
      user={user}
      setUser={setUser}
    />
  );
};

export default MyArticles;
