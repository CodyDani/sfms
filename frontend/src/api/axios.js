import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/sfms/backend/",
  withCredentials: true,
});

export default api;
