import API from "./api";

export const uploadReport = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post("/reports/upload", formData);

  return response.data;
};

export const analyzeReport = async (file) => {
  return uploadReport(file);
};