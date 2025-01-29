import React from "react";
import { useParams } from "react-router-dom";
import BingoGame from "../../components/BingoGame/BingoGame";
import TicTacToeBoard from "../../components/TicTacToeBoard/TicTacToeBoard";
import "./Game.css"; // Importamos el nuevo CSS

const Game = () => {
  const { name } = useParams();

  return (
    <div className="game-container">
      <h1 className="game-title">{name}</h1>
      <div className="game-content">
        {name === "Bingo" && <BingoGame />}
        {name === "Tic Tac Toe" && <TicTacToeBoard />}
      </div>
    </div>
  );
};

export default Game;
