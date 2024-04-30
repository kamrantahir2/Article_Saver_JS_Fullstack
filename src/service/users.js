import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const getUserById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getUserById };