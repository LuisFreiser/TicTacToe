export const saveGameToStorage = ({ board, turn }) => {
  //Guardamos la partida en localStorage
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  //Eliminamos el tablero de localStorage
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
