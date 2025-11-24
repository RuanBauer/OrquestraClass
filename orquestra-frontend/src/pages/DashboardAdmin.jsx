import { useEffect, useState } from "react";
import axios from "axios";

function DashboardAdmin() {
  const [usuariosPendentes, setUsuariosPendentes] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [novaTurma, setNovaTurma] = useState({ nome: "", naipe: "" });

  // Buscar usuários pendentes
  const fetchUsuariosPendentes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/usuarios/pendentes");
      setUsuariosPendentes(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar usuários pendentes.");
    }
  };

  // Aprovar usuário
  const aprovarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:5000/usuarios/autorizar/${id}`);
      fetchUsuariosPendentes();
    } catch (err) {
      console.error(err);
      alert("Erro ao aprovar usuário.");
    }
  };

  // Negar usuário
  const negarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      fetchUsuariosPendentes();
    } catch (err) {
      console.error(err);
      alert("Erro ao negar usuário.");
    }
  };

  // Criar turma
  const criarTurma = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/turmas", novaTurma);
      setNovaTurma({ nome: "", naipe: "" });
      alert("Turma criada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar turma.");
    }
  };

  useEffect(() => {
    fetchUsuariosPendentes();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard do Admin - OrquestraClass</h2>

      <section className="mb-5">
        <h4>Usuários pendentes</h4>
        {usuariosPendentes.length === 0 ? (
          <p>Nenhum usuário pendente.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosPendentes.map((user) => (
                <tr key={user._id}>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>{user.tipo}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => aprovarUsuario(user._id)}
                    >
                      Aprovar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => negarUsuario(user._id)}
                    >
                      Negar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h4>Criar nova turma</h4>
        <form className="row g-3" onSubmit={criarTurma}>
          <div className="col-md-6">
            <label className="form-label">Nome da Turma</label>
            <input
              type="text"
              className="form-control"
              value={novaTurma.nome}
              onChange={(e) => setNovaTurma({ ...novaTurma, nome: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Naipe/Instrumento</label>
            <input
              type="text"
              className="form-control"
              value={novaTurma.naipe}
              onChange={(e) => setNovaTurma({ ...novaTurma, naipe: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Criar Turma</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default DashboardAdmin;
