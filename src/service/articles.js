import axios from "axios";
const baseUrl = "http://localhost:3001/api/articles";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteArticle = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteArticle };
