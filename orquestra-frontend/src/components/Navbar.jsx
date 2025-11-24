import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">OrquestraClass</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user ? (
            <ul className="navbar-nav ms-auto">
              {user.tipo === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Dashboard</Link>
                  </li>
                </>
              )}
              {user.tipo === "professor" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/professor">Dashboard</Link>
                  </li>
                </>
              )}
              {user.tipo === "aluno" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/aluno">Dashboard</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Sair</button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
