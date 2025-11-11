import { useState } from "react";
import { api } from "../services/api";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.login(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
    } else {
      alert("Login inválido!");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login - OrquestraClass</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-warning w-100">Entrar</button>
      </form>
    </div>
  );
}
