import { Link } from "react-router-dom";
import Botao from "./Botao";

function ListaAlunos({ alunos, handleDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Instrumento</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map(aluno => (
          <tr key={aluno._id}>
            <td>{aluno.nome}</td>
            <td>{aluno.instrumento}</td>
            <td>{aluno.email}</td>
            <td>
              <Link to={`/alunos/editar/${aluno._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
              <Botao tipo="danger" onClick={() => handleDelete(aluno._id)}>Deletar</Botao>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaAlunos;
