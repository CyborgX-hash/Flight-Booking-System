import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
console.log("✈️ API Base URL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
