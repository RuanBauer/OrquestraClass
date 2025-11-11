import { useEffect, useState } from "react";

export default function Contents({ user }) {
  const [contents, setContents] = useState([]);

  const loadContents = async () => {
    const res = await fetch("https://seu-backend.onrender.com/api/contents", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    setContents(data);
  };

  useEffect(() => {
    loadContents();
  }, []);

  return (
    <div>
      {contents.length === 0 ? (
        <p className="text-muted">Nenhum conteúdo disponível.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {contents.map((c) => (
            <li key={c._id} className="list-group-item bg-dark text-light">
              <strong>{c.title}</strong>
              <br />
              <small>{c.description}</small>
              {c.fileUrl && (
                <div>
                  <a href={c.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-warning mt-2">
                    Abrir Material
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
