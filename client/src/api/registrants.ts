// src/api/registrants.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3010";

export interface RegistrantDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const createRegistrant = async (data: RegistrantDto) => {
  return axios.post(`${API_URL}/registrants`, data);
};

export const getRegistrants = async (search = "", sort = "", order = "") => {
  const res = await axios.get(`${API_URL}/registrants`, {
    params: { search, sort, order },
  });
  return res.data;
};

export const getRegistrantCount = async (search = '', sortField = '', order = '') => {
  const { total } = await getRegistrants(search, sortField, order);
  return total;
};


