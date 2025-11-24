import { useEffect, useState } from "react";
import axios from "axios";

function DashboardAluno() {
  const [agenda, setAgenda] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({ professorId: "", data: "", horario: "" });

  // Buscar agenda semanal do aluno
  const fetchAgenda = async () => {
    try {
      const res = await axios.get("http://localhost:5000/agenda/aluno");
      setAgenda(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar agenda.");
    }
  };

  // Buscar conteúdos disponíveis
  const fetchConteudos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/conteudos/aluno");
      setConteudos(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar conteúdos.");
    }
  };

  // Buscar professores disponíveis para aulas particulares
  const fetchProfessores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/usuarios/professores");
      setProfessores(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar professores.");
    }
  };

  useEffect(() => {
    fetchAgenda();
    fetchConteudos();
    fetchProfessores();
  }, []);

  // Agendar aula particular
  const agendarAula = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/aulasParticulares", novoAgendamento);
      setNovoAgendamento({ professorId: "", data: "", horario: "" });
      fetchAgenda();
      alert("Aula particular agendada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao agendar aula particular.");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard do Aluno - OrquestraClass</h2>

      <section className="mb-5">
        <h4>Agenda Semanal</h4>
        {agenda.length === 0 ? (
          <p>Você ainda não possui aulas agendadas.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Aula</th>
                <th>Professor</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {agenda.map((aula) => (
                <tr key={aula._id}>
                  <td>{aula.titulo}</td>
                  <td>{aula.professorNome}</td>
                  <td>{aula.data}</td>
                  <td>{aula.horario}</td>
                  <td>{aula.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-5">
        <h4>Conteúdos Disponíveis</h4>
        {conteudos.length === 0 ? (
          <p>Nenhum conteúdo disponível no momento.</p>
        ) : (
          <div className="list-group">
            {conteudos.map((conteudo) => (
              <a
                key={conteudo._id}
                href={conteudo.link || "#"}
                target="_blank"
                rel="noreferrer"
                className="list-group-item list-group-item-action"
              >
                {conteudo.titulo} ({conteudo.tipo})
              </a>
            ))}
          </div>
        )}
      </section>

      <section>
        <h4>Agendar Aula Particular</h4>
        <form className="row g-3" onSubmit={agendarAula}>
          <div className="col-md-4">
            <label className="form-label">Professor</label>
            <select
              className="form-select"
              value={novoAgendamento.professorId}
              onChange={(e) => setNovoAgendamento({ ...novoAgendamento, professorId: e.target.value })}
              required
            >
              <option value="">Selecione um professor</option>
              {professores.map((prof) => (
                <option key={prof._id} value={prof._id}>{prof.nome}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              value={novoAgendamento.data}
              onChange={(e) => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Horário</label>
            <input
              type="time"
              className="form-control"
              value={novoAgendamento.horario}
              onChange={(e) => setNovoAgendamento({ ...novoAgendamento, horario: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">Agendar Aula</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default DashboardAluno;
