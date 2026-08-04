import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

export const getLatestReport = () =>
  API.get("/reports/latest");

export default API;