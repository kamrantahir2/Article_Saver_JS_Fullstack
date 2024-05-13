import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedArticleAppUser");
    navigate("/login");
    setUser(null);
  };
  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
