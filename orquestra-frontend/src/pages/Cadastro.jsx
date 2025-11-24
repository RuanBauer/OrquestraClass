import { useState } from "react";
import { solicitarCadastro } from "../services/authService";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("aluno");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await solicitarCadastro({ nome, email, senha, tipo });
      setMensagem("Cadastro solicitado! Aguarde aprovação do administrador.");
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao solicitar cadastro.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Solicitar Cadastro</h3>
        {mensagem && <div className="alert alert-info">{mensagem}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de Usuário</label>
            <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Solicitar Acesso</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
