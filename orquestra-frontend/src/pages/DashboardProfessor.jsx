import { useEffect, useState } from "react";
import axios from "axios";

function DashboardProfessor() {
  const [aulas, setAulas] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [novaAula, setNovaAula] = useState({ titulo: "", descricao: "", data: "", horario: "" });
  const [novoConteudo, setNovoConteudo] = useState({ titulo: "", tipo: "", arquivo: null, aulaId: "" });
  const [aulasParticulares, setAulasParticulares] = useState([]);

  // Buscar aulas do professor
  const fetchAulas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/aulas/professor");
      setAulas(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar aulas.");
    }
  };

  // Buscar aulas particulares
  const fetchAulasParticulares = async () => {
    try {
      const res = await axios.get("http://localhost:5000/aulasParticulares/professor");
      setAulasParticulares(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar aulas particulares.");
    }
  };

  useEffect(() => {
    fetchAulas();
    fetchAulasParticulares();
  }, []);

  // Criar nova aula
  const criarAula = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/aulas", novaAula);
      setNovaAula({ titulo: "", descricao: "", data: "", horario: "" });
      fetchAulas();
      alert("Aula criada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar aula.");
    }
  };

  // Adicionar conteúdo a uma aula
  const adicionarConteudo = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titulo", novoConteudo.titulo);
      formData.append("tipo", novoConteudo.tipo);
      formData.append("arquivo", novoConteudo.arquivo);
      formData.append("aulaId", novoConteudo.aulaId);

      await axios.post("http://localhost:5000/conteudos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNovoConteudo({ titulo: "", tipo: "", arquivo: null, aulaId: "" });
      alert("Conteúdo adicionado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar conteúdo.");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Dashboard do Professor - OrquestraClass</h2>

      <section className="mb-5">
        <h4>Minhas Aulas</h4>
        {aulas.length === 0 ? (
          <p>Você ainda não tem aulas cadastradas.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map((aula) => (
                <tr key={aula._id}>
                  <td>{aula.titulo}</td>
                  <td>{aula.descricao}</td>
                  <td>{aula.data}</td>
                  <td>{aula.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-5">
        <h4>Criar Nova Aula</h4>
        <form className="row g-3" onSubmit={criarAula}>
          <div className="col-md-6">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={novaAula.titulo}
              onChange={(e) => setNovaAula({ ...novaAula, titulo: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              className="form-control"
              value={novaAula.descricao}
              onChange={(e) => setNovaAula({ ...novaAula, descricao: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              value={novaAula.data}
              onChange={(e) => setNovaAula({ ...novaAula, data: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Horário</label>
            <input
              type="time"
              className="form-control"
              value={novaAula.horario}
              onChange={(e) => setNovaAula({ ...novaAula, horario: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Criar Aula</button>
          </div>
        </form>
      </section>

      <section className="mb-5">
        <h4>Adicionar Conteúdo a uma Aula</h4>
        <form className="row g-3" onSubmit={adicionarConteudo}>
          <div className="col-md-4">
            <label className="form-label">Aula</label>
            <select
              className="form-select"
              value={novoConteudo.aulaId}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, aulaId: e.target.value })}
              required
            >
              <option value="">Selecione uma aula</option>
              {aulas.map((aula) => (
                <option key={aula._id} value={aula._id}>{aula.titulo}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Título do Conteúdo</label>
            <input
              type="text"
              className="form-control"
              value={novoConteudo.titulo}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, titulo: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Tipo</label>
            <select
              className="form-select"
              value={novoConteudo.tipo}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, tipo: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              <option value="video">Vídeo</option>
              <option value="material">Material</option>
              <option value="atividade">Atividade</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Arquivo</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNovoConteudo({ ...novoConteudo, arquivo: e.target.files[0] })}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">Adicionar Conteúdo</button>
          </div>
        </form>
      </section>

      <section>
        <h4>Aulas Particulares Agendadas</h4>
        {aulasParticulares.length === 0 ? (
          <p>Nenhuma aula particular agendada.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {aulasParticulares.map((aula) => (
                <tr key={aula._id}>
                  <td>{aula.alunoNome}</td>
                  <td>{aula.data}</td>
                  <td>{aula.horario}</td>
                  <td>{aula.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default DashboardProfessor;
