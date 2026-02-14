import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3010";

export const getSettings = async () => {
  const res = await axios.get(`${API_URL}/settings`);
  return res.data[0]; // Assuming there is only one settings document
};

export const updateSettings = async (data: { totalSeats: number }) => {
  return axios.post(`${API_URL}/settings`, data);
};

export const getRemainingSeats = async () => {
  const res = await axios.get(`${API_URL}/settings/remaining`);
  return res.data.remaining;
};
