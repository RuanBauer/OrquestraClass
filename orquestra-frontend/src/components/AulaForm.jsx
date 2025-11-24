import { useState, useEffect } from "react";
import { createAula, updateAula, getAulaById } from "../services/aulaService";
import { useNavigate, useParams } from "react-router-dom";

function AulaForm() {
  const [aula, setAula] = useState({ nome: "", descricao: "", data: "", duracao: "", turmaId: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAulaById(id).then(data => setAula({
        nome: data.nome,
        descricao: data.descricao,
        data: data.data,
        duracao: data.duracao,
        turmaId: data.turmaId
      }));
    }
  }, [id]);

  const handleChange = (e) => setAula({ ...aula, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAula(id, aula);
      } else {
        await createAula(aula);
      }
      navigate("/aulas");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar aula");
    }
  };

  return (
    <div className="container mt-3">
      <h2>{id ? "Editar Aula" : "Nova Aula"}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Nome da Aula</label>
          <input type="text" name="nome" value={aula.nome} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Descrição</label>
          <input type="text" name="descricao" value={aula.descricao} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Data e Hora</label>
          <input type="datetime-local" name="data" value={aula.data} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Duração (minutos)</label>
          <input type="number" name="duracao" value={aula.duracao} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Turma</label>
          <input type="text" name="turmaId" value={aula.turmaId} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">{id ? "Atualizar" : "Cadastrar"}</button>
        </div>
      </form>
    </div>
  );
}

export default AulaForm;
