import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (email, password) => api.post("/auth/login", { email, password });
export const getInstruments = () => api.get("/instruments/list");
export const submitTrade = (data) => api.post("/trade/submit", data);

export default api;
