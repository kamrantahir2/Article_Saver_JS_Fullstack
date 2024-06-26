import axios from "axios";
const baseUrl = "/api/articles";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
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
  const request = axios.put(`${baseUrl}/${id}`, newObject, config());
  return request.then((response) => response.data);
};

const verifyUser = () => {
  const request = axios.post(`${baseUrl}/verify`, {}, config());
  return request.then((response) => response.data);
};

const deleteArticle = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config());
  return request.then((response) => response.data);
};

const saveArticle = (id) => {
  const request = axios.post(`${baseUrl}/saveArticle/${id}`, {}, config());
  return request.then((response) => response.data);
};

const unsaveArticle = (id) => {
  const request = axios.put(`${baseUrl}/unsaveArticle/${id}`, {}, config());
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deleteArticle,
  setToken,
  getById,
  saveArticle,
  unsaveArticle,
  verifyUser,
};
