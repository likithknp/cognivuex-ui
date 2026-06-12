import axios from "axios";

const API = axios.create({
  baseURL: "https://cognivuex-backend-1.onrender.com/api",
});

export const getLatestReport = () =>
  API.get("/reports/latest");

export default API;