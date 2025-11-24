import { useEffect, useState } from "react";
import { getConteudos, deleteConteudo } from "../services/conteudoService";
import CardConteudo from "../components/CardConteudo";
import { Link } from "react-router-dom";
import Botao from "../components/Botao";

function Conteudos() {
  const [conteudos, setConteudos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getConteudos();
      setConteudos(res);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente deletar este conteúdo?")) {
      await deleteConteudo(id);
      setConteudos(conteudos.filter(c => c._id !== id));
    }
  };

  return (
    <div className="container mt-3">
      <h2>Conteúdos</h2>
      <Link to="/conteudos/novo" className="btn btn-primary mb-3">Novo Conteúdo</Link>
      <div className="row">
        {conteudos.map(conteudo => (
          <div key={conteudo._id} className="col-md-4">
            <CardConteudo conteudo={conteudo} />
            <div className="mt-1 d-flex justify-content-between">
              <Link to={`/conteudos/editar/${conteudo._id}`} className="btn btn-warning btn-sm">Editar</Link>
              <Botao tipo="danger" onClick={() => handleDelete(conteudo._id)}>Deletar</Botao>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conteudos;
