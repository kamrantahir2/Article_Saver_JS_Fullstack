import axios from "axios";
const baseUrl = "http://localhost:3001/api/articles";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const config = () => {
  return {
    headers: { Authorization: token },
  };
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject, config());
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteArticle = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config());
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteArticle, setToken };
