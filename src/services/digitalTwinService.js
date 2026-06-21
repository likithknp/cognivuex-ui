import API from "./api";

export const getDigitalTwin = async () => {
  const response = await API.get(
    "/digital-twin/latest"
  );

  return response.data;
};