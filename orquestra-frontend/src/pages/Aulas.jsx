import { useEffect, useState } from "react";
import { getAulas, deleteAula } from "../services/aulaService";
import { Link } from "react-router-dom";
import Botao from "../components/Botao";

function Aulas() {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAulas();
      setAulas(res);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente deletar esta aula?")) {
      await deleteAula(id);
      setAulas(aulas.filter(a => a._id !== id));
    }
  };

  return (
    <div className="container mt-3">
      <h2>Aulas</h2>
      <Link to="/aulas/novo" className="btn btn-primary mb-2">Nova Aula</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Duração</th>
            <th>Turma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map(aula => (
            <tr key={aula._id}>
              <td>{aula.nome}</td>
              <td>{aula.descricao}</td>
              <td>{new Date(aula.data).toLocaleString()}</td>
              <td>{aula.duracao} min</td>
              <td>{aula.turmaId}</td>
              <td>
                <Link to={`/aulas/editar/${aula._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <Botao tipo="danger" onClick={() => handleDelete(aula._id)}>Deletar</Botao>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Aulas;
