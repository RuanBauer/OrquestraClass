import React from "react";

function AgendaSemanal({ aulas }) {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  // Filtra aulas por dia da semana
  const aulasPorDia = (diaIndex) => aulas.filter(aula => {
    const data = new Date(aula.data);
    return data.getDay() === diaIndex; // 0 = Domingo, 1 = Segunda, etc.
  });

  return (
    <div className="agenda-semanal">
      <h3>Agenda Semanal</h3>
      <div className="d-flex justify-content-between">
        {dias.map((dia, index) => (
          <div key={index} className="border p-2" style={{ width: "13%" }}>
            <strong>{dia}</strong>
            {aulasPorDia(index + 1).map(aula => (
              <div key={aula._id} className="mt-1 p-1 bg-light border rounded">
                {aula.nome} <br />
                {new Date(aula.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgendaSemanal;
