// src/services/alunoService.js
import axios from "axios";
const API = "http://localhost:3000/api/alunos";

export const getAlunos = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Buscar aluno por ID
export const getAlunoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Criar novo aluno
export const createAluno = async (dados) => {
  const res = await axios.post(API_URL, dados);
  return res.data;
};

// Atualizar aluno
export const updateAluno = async (id, dados) => {
  const res = await axios.put(`${API_URL}/${id}`, dados);
  return res.data;
};

// Deletar aluno
export const deleteAluno = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
