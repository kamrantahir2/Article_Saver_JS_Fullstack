import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setUser, setNotificationMessage }) => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedArticleAppUser");
    setUser(null);
    setNotificationMessage("You have successfully logged out", "info");
    navigate("/");
  };
  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
