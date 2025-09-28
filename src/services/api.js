import axios from "axios";

const API = axios.create({
  baseURL: "https://mahila-shakti-yojana.vercel.app/api",
  timeout: 10000,
});

// optional: attach token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
