import api from "./axios";

export const getAllProperties = async () => {
  const response = await api.get("/properties");

  return response.data;
};
