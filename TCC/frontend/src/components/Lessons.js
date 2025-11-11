import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Lessons({ user }) {
  const [lessons, setLessons] = useState([]);

  const loadLessons = async () => {
    const data = await api.getLessons(user.token);
    setLessons(data);
  };

  const cancelLesson = async (id) => {
    await fetch(`https://seu-backend.onrender.com/api/lessons/${id}/cancel`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    loadLessons();
  };

  useEffect(() => {
    loadLessons();
  }, []);

  return (
    <div>
      {lessons.length === 0 ? (
        <p className="text-muted">Nenhuma aula encontrada.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {lessons.map((l) => (
            <li key={l._id} className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
              <div>
                <strong>{l.title}</strong> <br />
                {new Date(l.date).toLocaleString("pt-BR")}
              </div>
              <span>
                <span className={`badge ${l.status === "cancelada" ? "bg-danger" : "bg-success"} me-2`}>
                  {l.status}
                </span>
                {l.status !== "cancelada" && (
                  <button className="btn btn-sm btn-outline-warning" onClick={() => cancelLesson(l._id)}>
                    Cancelar
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
