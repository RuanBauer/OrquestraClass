function CardConteudo({ conteudo }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{conteudo.titulo}</h5>
        <p className="card-text">Tipo: {conteudo.tipo}</p>
        {conteudo.arquivo && (
          <a href={conteudo.arquivo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Abrir arquivo
          </a>
        )}
      </div>
    </div>
  );
}

export default CardConteudo;
