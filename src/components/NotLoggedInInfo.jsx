import { useState } from "react";

const NotLoggedInInfo = () => {
  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(!active);
  };

  if (active) {
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
