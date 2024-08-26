const Square = ({ children, updateBoard, isSelected, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  //Enviamos el index a la funcion UpdateBoard para actualizar el tablero
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

export default Square;
