import { Link } from "react-router-dom";
import Botao from "./Botao";

function ListaProfessores({ professores, handleDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {professores.map(prof => (
          <tr key={prof._id}>
            <td>{prof.nome}</td>
            <td>{prof.email}</td>
            <td>
              <Link to={`/professores/editar/${prof._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
              <Botao tipo="danger" onClick={() => handleDelete(prof._id)}>Deletar</Botao>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaProfessores;
