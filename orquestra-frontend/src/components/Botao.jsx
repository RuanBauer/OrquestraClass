function Botao({ children, onClick, tipo = "primary" }) {
  return (
    <button className={`btn btn-${tipo}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Botao;
