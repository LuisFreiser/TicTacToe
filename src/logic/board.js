import { WINNER_COMBOS } from "../constants";

//!FUNCION PARA REVISAR SI HAY UN GANADOR
export const checkWinner = (boardToCheck) => {
  //Recorremos el array para ver si hay un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    //Comprobamos si hay un ganador
    if (
      boardToCheck[a] && //Comprobamos si el tablero tiene un valor X o O y luego comparamos si son iguales
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; //Devolvemos el ganador
    }
  }
  return null; //Devolvemos null si no hay ganador
};

//!FUNCION PARA REVISAR SI HAY UN EMPATE
export const checkEndGame = (newBoard) => {
  //"Every" revisa si todos los elementos del array son diferentes de null y me devuelve true o false
  return newBoard.every((square) => square !== null);
};
