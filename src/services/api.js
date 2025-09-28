import axios from "axios";

const API = axios.create({
  baseURL: "http://https://silly-axolotl-679d7b.netlify.app/api",
  timeout: 10000,
});

// optional: attach token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
