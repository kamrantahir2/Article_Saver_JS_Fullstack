import { useState } from "react";

const NotLoggedInInfo = () => {
  const [active, setActive] = useState(true);
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  setTimeout(() => {
    setDisplay(true);
  }, 2000);

  if (active && display) {
    return (
      <div className="top-info">
        <div className="login-info">
          <p>Please log in for full access </p>
        </div>
        <button className="close-btn" onClick={handleClick}>
          X
        </button>
      </div>
    );
  }
};

export default NotLoggedInInfo;
