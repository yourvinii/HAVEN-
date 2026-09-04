import api from "./axios";

export const getAllProperties = async () => {
  const response = await api.get("/properties");

  return response.data;
};

export const getPropertyById = async (propertyId) => {
  const response = await api.get(`/properties/${propertyId}`);

  return response.data;
};