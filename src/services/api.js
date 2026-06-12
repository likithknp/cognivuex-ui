import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090/api",
});

export const getLatestReport = () =>
  API.get("/reports/latest");

export default API;