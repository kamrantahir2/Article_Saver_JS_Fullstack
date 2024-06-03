import { useState, useRef } from "react";
import userService from "../service/users.js";
import Togglable from "./Togglable.jsx";
import loginService from "../service/login.js";
import articleService from "../service/articles.js";
import { useNavigate } from "react-router-dom";

const UserForm = ({ setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      name,
      password,
    };

    await userService.addUser(newUser);

    const user = { username, password };

    const loggedInUser = await loginService.login(user);

    window.localStorage.setItem(
      "loggedArticleAppUser",
      JSON.stringify(loggedInUser)
    );

    articleService.setToken(loggedInUser.token);
    setUser(loggedInUser);

    setUsername("");
    setName("");
    setPassword("");
    navigate("/");
    setNotificationMessage("User created successfully", "success");
  };

  return (
    <Togglable buttonLabel="Register User">
      <div className="border-t-2 border-black w-6/12 md:w-6/12 m-auto mt-14"></div>

      <form onSubmit={handleCreate}>
        <h4 className="text-black text-2xl my-6 underline ">Register</h4>

        <div>
          <label className="input input-ghost w-9/12 lg:w-5/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
        </div>

        <div>
          <label className="input input-ghost w-9/12 lg:w-5/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Username"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </label>
        </div>

        <div>
          <label className="input input-ghost w-9/12 lg:w-5/12 m-auto bg-transparent flex items-center gap-2">
            <input
              className="grow text-black rounded-2xl mb-5 w-6/12"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill=""
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <button
          className="my-3 w-9/12 lg:w-5/12 hover:bg-gray-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Togglable>
  );
};

export default UserForm;
