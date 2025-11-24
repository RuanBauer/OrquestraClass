// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, tipoUsuario, user }) {
  // user = { tipo: "admin"|"professor"|"aluno", autorizado: true|false }

  if (!user) {
    // Se não está logado, redireciona para login
    return <Navigate to="/" replace />;
  }

  if (user.tipo !== tipoUsuario) {
    // Se o tipo de usuário não corresponde, bloqueia acesso
    return <Navigate to="/" replace />;
  }

  if ((tipoUsuario === "professor" || tipoUsuario === "aluno") && !user.autorizado) {
    // Se não autorizado
    return <div className="alert alert-warning mt-4 text-center">
      Aguarde a autorização do administrador.
    </div>;
  }

  return children;
}

export default ProtectedRoute;
