import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardAluno from "./pages/DashboardAluno";
import Aulas from "./pages/Aulas";
import AulaForm from "./components/AulaForm";
import Conteudos from "./pages/Conteudos";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas protegidas Admin */}
        <Route element={<ProtectedRoute tipo="admin" />}>
          <Route path="/admin" element={<DashboardAdmin />} />
        </Route>

        {/* Rotas protegidas Professor */}
        <Route element={<ProtectedRoute tipo="professor" />}>
          <Route path="/professor" element={<DashboardProfessor />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/aulas/novo" element={<AulaForm />} />
          <Route path="/aulas/editar/:id" element={<AulaForm />} />
          <Route path="/conteudos" element={<Conteudos />} />
        </Route>

        {/* Rotas protegidas Aluno */}
        <Route element={<ProtectedRoute tipo="aluno" />}>
          <Route path="/aluno" element={<DashboardAluno />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
