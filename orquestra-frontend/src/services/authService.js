import axios from "axios";

const API = "http://localhost:3000/api/auth"; // backend

export const login = async (email, senha) => {
  const res = await axios.post(`${API}/login`, { email, senha });
  return res.data;
};

export const solicitarCadastro = async (usuario) => {
  const res = await axios.post(`${API}/solicitar-cadastro`, usuario);
  return res.data;
};
