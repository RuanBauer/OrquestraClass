// src/services/professorService.js
import axios from "axios";
const API = "http://localhost:3000/api/professores";

export const getProfessores = async () => {
  const res = await axios.get(API);
  return res.data;
};
