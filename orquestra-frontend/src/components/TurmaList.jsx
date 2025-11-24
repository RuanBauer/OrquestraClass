import { Link } from "react-router-dom";
import Botao from "./Botao";

function ListaTurmas({ turmas, handleDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome da Turma</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {turmas.map(turma => (
          <tr key={turma._id}>
            <td>{turma.nome}</td>
            <td>{turma.descricao}</td>
            <td>
              <Link to={`/turmas/editar/${turma._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
              <Botao tipo="danger" onClick={() => handleDelete(turma._id)}>Deletar</Botao>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaTurmas;
