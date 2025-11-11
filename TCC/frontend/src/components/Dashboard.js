import Lessons from "./Lessons";
import Contents from "./Contents";

export default function Dashboard({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="dashboard">
      <nav className="navbar navbar-dark bg-dark px-3">
        <h3 className="text-warning">OrquestraClass</h3>
        <button className="btn btn-outline-warning" onClick={handleLogout}>
          Sair
        </button>
      </nav>

      <div className="container mt-4">
        <h4 className="text-light">Bem-vindo(a)!</h4>
        <p className="text-secondary">
          Aqui você pode visualizar as aulas agendadas, cancelar aulas e acessar conteúdos musicais.
        </p>

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <div className="card bg-dark text-light shadow">
              <div className="card-body">
                <h5 className="card-title text-warning">Aulas</h5>
                <Lessons user={user} />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card bg-dark text-light shadow">
              <div className="card-body">
                <h5 className="card-title text-warning">Conteúdos Didáticos</h5>
                <Contents user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
