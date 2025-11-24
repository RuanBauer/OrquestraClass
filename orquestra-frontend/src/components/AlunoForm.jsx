import { useState, useEffect } from "react";
import { createAluno, getAlunoById, updateAluno } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

function AlunoForm() {
  const [aluno, setAluno] = useState({ nome: "", instrumento: "" });
  const navigate = useNavigate();
  const { id } = useParams(); // pega o ID da URL (para edição)

  // Se tiver ID, busca os dados do aluno
  useEffect(() => {
    if (id) {
      const fetchAluno = async () => {
        try {
          const res = await getAlunoById(id);
          setAluno(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchAluno();
    }
  }, [id]);

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAluno(id, aluno);
      } else {
        await createAluno(aluno);
      }
      navigate("/alunos"); // volta para lista de alunos
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Aluno" : "Cadastrar Aluno"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={aluno.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Instrumento</label>
          <input
            type="text"
            className="form-control"
            name="instrumento"
            value={aluno.instrumento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default AlunoForm;
