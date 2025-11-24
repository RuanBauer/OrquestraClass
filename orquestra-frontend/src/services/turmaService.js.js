import axios from "axios";
const API = "http://localhost:3000/api/turmas";

export const getTurmas = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createTurma = async (turma) => {
  const res = await axios.post(API, turma);
  return res.data;
};

export const deleteTurma = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
