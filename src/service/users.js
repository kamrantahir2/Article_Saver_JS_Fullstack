import axios from "axios";
const baseUrl = "/api/users";

const getUserById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const addUser = (userObject) => {
  userObject.username = userObject.username.toLowerCase();
  const request = axios.post(baseUrl, userObject);
  return request.then((response) => response.data);
};

export default { getUserById, addUser };
