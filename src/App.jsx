import { useState } from "react";
import { TURNS } from "./constants";
import Square from "./components/Square";
import confetti from "canvas-confetti";
import WinnerModal from "./components/WinnerModal";
import { checkWinner, checkEndGame } from "./logic/board";
import { saveGameToStorage, resetGameStorage } from "./storage/index";

function App() {
  //State Board para almacenar X o O
  const [board, setBoard] = useState(() => {
    //Recuperamos el tablero de localStorage
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null); //Creamos un array de 9 elementos rellenos de null
  });
  //State Turnos para cambiar entre X y O
  const [turn, setTurn] = useState(() => {
    //Recuperamos el turno de localStorage
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X; //"??": si turnFromStorage es null o undefined devuelve X
  });
  //State Winner para mostrar el ganador
  const [winner, setWinner] = useState(null); //True: ganador, null: no hay ganador

  //!FUNCION PARA ACTUALIZAR EL TABLERO
  const updateBoard = (index) => {
    //Validamos si el tablero ya tiene un valor y no se puede cambiar
    if (board[index] !== null || winner !== null) {
      return;
    }
    //Actualizamos el tablero con X o O
    const newBoard = [...board]; //Creamos una copia del tablero(square)
    newBoard[index] = turn; //Asiganamos el Turn con X o O
    setBoard(newBoard);
    //Actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //Guardamos el tablero en el localStorage
    saveGameToStorage({ board: newBoard, turn: newTurn }); //Enviamos el nuevo tablero y el nuevo turno
    //Revisamos si hay un ganador
    const newWinner = checkWinner(newBoard); //Enviamos el nuevo tablero
    if (newWinner) {
      //Activamos la animacion confetti
      confetti({
        particleCount: 150, //Cantidad de particulas
        spread: 360, //Ancho de disparo de las particulas
        origin: { y: 0.5 }, //Posicion de disparo de las particulas
      });
      setWinner(newWinner);
      //Establecemos el empate en false con la funcion checkEndGame
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  //!FUNCION PARA REINICIAR EL JUEGO
  const resetGame = () => {
    //Reseteamos todos los valores de los estados
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    //Eliminamos el tablero de localStorage
    resetGameStorage();
  };

  //!RENDERIZAMOS EL TABLERO
  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reiniciar el Juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
