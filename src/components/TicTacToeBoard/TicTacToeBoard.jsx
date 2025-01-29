import { useState, useEffect } from "react";
import "./TicTacToeBoard.css";

const TicTacToeBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showRestartScreen, setShowRestartScreen] = useState(false);

  useEffect(() => {
    // Asigna aleatoriamente 'X' o 'O' al jugador cuando inicia el juego
    const assignedPlayer = Math.random() < 0.5 ? "X" : "O";
    setPlayer(assignedPlayer);
    setIsPlayerTurn(assignedPlayer === "X"); // Si es X, empieza el jugador; si es O, empieza la máquina
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      setTimeout(aiMove, 700); // Retraso para simular "pensamiento" de la IA
    }
  }, [isPlayerTurn, winner]);

  const handleCellClick = (index) => {
    if (!isPlayerTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setWinner(calculateWinner(newBoard));
    setIsPlayerTurn(false); // Ahora juega la máquina
  };

  const aiMove = () => {
    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    if (availableMoves.length === 0 || winner) return;

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newBoard = [...board];
    newBoard[randomMove] = player === "X" ? "O" : "X"; // IA juega con el otro símbolo
    setBoard(newBoard);
    setWinner(calculateWinner(newBoard));
    setIsPlayerTurn(true); // Vuelve a jugar el jugador
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : "Draw";
  };

  const resetGame = () => {
    setShowRestartScreen(true);
    setTimeout(() => {
      setShowRestartScreen(false);
      setBoard(Array(9).fill(null));
      const assignedPlayer = Math.random() < 0.5 ? "X" : "O";
      setPlayer(assignedPlayer);
      setIsPlayerTurn(assignedPlayer === "X");
      setWinner(null);
    }, 2000);
  };

  return (
    <div className="tic-tac-toe-container">
      {showRestartScreen ? (
        <div className="restart-screen">
          <img src="/restart.png" alt="Restarting" className="restart-icon" />
          <h1>Restarting...</h1>
        </div>
      ) : (
        <>
          <p>You are: <strong>{player}</strong></p>
          <div className="tic-tac-toe-board">
            {board.map((cell, index) => (
              <button key={index} onClick={() => handleCellClick(index)} disabled={!!cell || !!winner}>
                {cell}
              </button>
            ))}
          </div>
          {winner && (
            <div className="winner-message">
              <p>{winner === "Draw" ? "It's a draw!" : `🎉 Winner: ${winner}! 🎉`}</p>
              <button className="reset-button" onClick={resetGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TicTacToeBoard;
