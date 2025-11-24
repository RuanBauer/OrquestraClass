import axios from "axios";
const API = "http://localhost:3000/api/aulas";

export const getAulas = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getAulaById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createAula = async (aula) => {
  const res = await axios.post(API, aula);
  return res.data;
};

export const updateAula = async (id, aula) => {
  const res = await axios.put(`${API}/${id}`, aula);
  return res.data;
};

export const deleteAula = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
