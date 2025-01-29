import React, { useState, useEffect } from "react";
import BingoCartons from "../BingoCartons/BingoCartons";
import { generateCarton } from "../../utils/bingoUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BingoGame.css";

const BingoGame = () => {
  const [numCartons, setNumCartons] = useState(null);
  const [cartons, setCartons] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showRestartScreen, setShowRestartScreen] = useState(false);
  const [completedLines, setCompletedLines] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (numCartons) {
      setCartons(Array.from({ length: numCartons }, () => generateCarton()));
      setCompletedLines(
        Array.from({ length: numCartons }, () => ({
          rows: Array(5).fill(false),
          columns: Array(5).fill(false),
          bingo: false,
        }))
      );
    }
  }, [numCartons]);

  const drawNumber = () => {
    if (gameOver || isWaiting) return;

    setIsWaiting(true);
    setTimeout(() => {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 75) + 1;
      } while (drawnNumbers.includes(newNumber) && drawnNumbers.length < 75);

      setDrawnNumbers((prev) => [...prev, newNumber]);
      setCurrentNumber(newNumber);
      setIsWaiting(false);

      // 🔥 Al extraer un número, eliminamos el toast anterior
      if (toastMessage) {
        toast.dismiss();
        setToastMessage(null);
      }
    }, 1500);
  };

  useEffect(() => {
    if (currentNumber) {
      checkBingo();
    }
  }, [currentNumber]);

  const markNumber = (cartonIndex, column, rowIndex) => {
    if (!currentNumber) return;
    const newCartons = [...cartons];
    if (newCartons[cartonIndex][column][rowIndex] === currentNumber) {
      newCartons[cartonIndex][column][rowIndex] = "X";
      setCartons(newCartons);
    }
  };

  const checkBingo = () => {
    const newCompletedLines = [...completedLines];
    let gameWon = false;
    let newToastMessage = null;

    cartons.forEach((carton, cartonIndex) => {
      const columns = Object.keys(carton);

      for (let i = 0; i < 5; i++) {
        if (!newCompletedLines[cartonIndex].rows[i] &&
          columns.every((col) => carton[col][i] === "X" || carton[col][i] === "FREE")) {
          newToastMessage = `🎉 Línea completada en el cartón ${cartonIndex + 1}`;
          newCompletedLines[cartonIndex].rows[i] = true;
        }
      }

      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        const column = columns[colIndex];
        if (!newCompletedLines[cartonIndex].columns[colIndex] &&
          carton[column].every((num) => num === "X" || num === "FREE")) {
          newToastMessage = `🎉 Columna completada en el cartón ${cartonIndex + 1}`;
          newCompletedLines[cartonIndex].columns[colIndex] = true;
        }
      }

      const allNumbers = columns.flatMap((col) => carton[col]);
      if (!newCompletedLines[cartonIndex].bingo &&
        allNumbers.every((num) => num === "X" || num === "FREE")) {
        newToastMessage = `🏆 ¡BINGO en el cartón ${cartonIndex + 1}! 🏆`;
        newCompletedLines[cartonIndex].bingo = true;
        gameWon = true;
      }
    });

    setCompletedLines(newCompletedLines);

    if (newToastMessage) {
      setToastMessage(newToastMessage);
      toast.dismiss();
      toast.info(newToastMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        className: gameWon ? "toast-bingo" : "toast-container",
      });
    }

    if (gameWon) {
      setGameOver(true);
      setTimeout(() => {
        setShowRestartScreen(true);
        setTimeout(() => {
          resetGame();
        }, 3000);
      }, 2000);
    }
  };

  const resetGame = () => {
    setShowRestartScreen(true);
    setTimeout(() => {
      setShowRestartScreen(false);
      setGameOver(false);
      setGameStarted(false);
      setDrawnNumbers([]);
      setCurrentNumber(null);
      setNumCartons(null);
      setCartons([]);
      setCompletedLines([]);
      setToastMessage(null);
      toast.dismiss();
    }, 2000);
  };

  return (
    <div className="bingo-game">
      <ToastContainer />
      {showRestartScreen ? (
        <div className="restart-screen">
          <img src="/restart.png" alt="Restarting" className="restart-icon" />
          <h1>Restarting...</h1>
        </div>
      ) : (
        <>
          {!gameStarted ? (
            <div className="carton-selection">
              <p>Choose the number of cartons:</p>
              <div className="carton-buttons">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className={numCartons === num ? "selected" : ""}
                    onClick={() => setNumCartons(num)}
                  >
                    {num} Cartons
                  </button>
                ))}
              </div>
              {numCartons && (
                <button className="start-button" onClick={() => setGameStarted(true)}>Start Game</button>
              )}
            </div>
          ) : (
            <>
              <BingoCartons cartons={cartons} markNumber={markNumber} />
              {!gameOver && (
                <div className="bingo-controls">
                  <button className="draw-button" onClick={drawNumber} disabled={isWaiting}>
                    {isWaiting ? "Waiting..." : "Draw Number"}
                  </button>
                  <button onClick={resetGame} className="reset-button">Restart</button>
                </div>
              )}
              {currentNumber && (
                <div className="current-number-container show">
                  <div className="current-number-box">
                    {currentNumber}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BingoGame;
