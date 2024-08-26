import Square from "./Square";
const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;
  const winnerText = winner === false ? "Empate" : "Ganador";
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">
          {/* Si winner es true, renderizamos Square con el valor de winner
              como hijo, si es false, no lo renderizamos */}
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}>Reiniciar el Juego</button>
        </footer>
      </div>
    </section>
  );
};

export default WinnerModal;
