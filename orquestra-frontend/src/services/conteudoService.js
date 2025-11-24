// src/services/conteudoService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/materiais";

// Listar todos os conteúdos
export const getConteudos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Listar conteúdos por aula
export const getConteudosByAula = async (aulaId) => {
  const res = await axios.get(`${API_URL}/aula/${aulaId}`);
  return res.data;
};

// Adicionar conteúdo (vídeo, material, atividade)
export const adicionarConteudo = async (conteudo) => {
  const formData = new FormData();
  formData.append("titulo", conteudo.titulo);
  formData.append("tipo", conteudo.tipo);
  formData.append("arquivo", conteudo.arquivo);
  formData.append("aulaId", conteudo.aulaId);

  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Atualizar conteúdo
export const updateConteudo = async (id, conteudo) => {
  const res = await axios.put(`${API_URL}/${id}`, conteudo);
  return res.data;
};

// Deletar conteúdo
export const deleteConteudo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
