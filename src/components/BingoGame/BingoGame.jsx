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
  const [autoMode, setAutoMode] = useState(false);

  useEffect(() => {
    if (numCartons && numCartons > 0) {
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

  useEffect(() => {
    if (autoMode && gameStarted && !gameOver && !isWaiting) {
      const interval = setInterval(() => {
        drawNumber();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoMode, gameStarted, gameOver, isWaiting]);

  const startGame = () => {
    setGameStarted(true);
    setDrawnNumbers([]);
    setCurrentNumber(null);
  };

  const drawNumber = () => {
    if (!gameStarted || gameOver || isWaiting) return;

    setIsWaiting(true);

    setTimeout(() => {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 75) + 1;
      } while (drawnNumbers.includes(newNumber) && drawnNumbers.length < 75);

      setCurrentNumber(newNumber);
      setIsWaiting(false);
      setDrawnNumbers((prev) => [...prev, newNumber]);
    }, 1500);
  };

  useEffect(() => {
    if (currentNumber !== null) {
      checkBingo();
      if (autoMode) autoMarkNumber(currentNumber);
    }
  }, [currentNumber]);

  const autoMarkNumber = (number) => {
    setCartons((prevCartons) =>
      prevCartons.map((carton) => {
        const newCarton = { ...carton };
        Object.keys(newCarton).forEach((column) => {
          newCarton[column] = newCarton[column].map((value) =>
            value === number ? "X" : value
          );
        });
        return newCarton;
      })
    );
  };

  const markNumberManually = (cartonIndex, column, row) => {
    if (autoMode) return;

    setCartons((prevCartons) => {
      const newCartons = [...prevCartons];
      if (newCartons[cartonIndex][column][row] === currentNumber) {
        newCartons[cartonIndex][column][row] = "X";
      }
      return newCartons;
    });
  };

  useEffect(() => {
    if (currentNumber !== null) {
      checkBingo();
    }
  }, [cartons]);

  const checkBingo = () => {
    const newCompletedLines = [...completedLines];
    let gameWon = false;

    cartons.forEach((carton, cartonIndex) => {
      const columns = Object.keys(carton);
      for (let i = 0; i < 5; i++) {
        if (
          !newCompletedLines[cartonIndex].rows[i] &&
          columns.every((col) => carton[col][i] === "X" || carton[col][i] === "FREE")
        ) {
          toast.success(`🎉 Line completed on card ${cartonIndex + 1}!`, { autoClose: 3000 });
          newCompletedLines[cartonIndex].rows[i] = true;
        }
      }

      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        if (
          !newCompletedLines[cartonIndex].columns[colIndex] &&
          carton[columns[colIndex]].every((num) => num === "X" || num === "FREE")
        ) {
          toast.success(`🎉 Column completed on card ${cartonIndex + 1}!`, { autoClose: 3000 });
          newCompletedLines[cartonIndex].columns[colIndex] = true;
        }
      }

      const allNumbers = columns.flatMap((col) => carton[col]);
      if (
        !newCompletedLines[cartonIndex].bingo &&
        allNumbers.every((num) => num === "X" || num === "FREE")
      ) {
        toast.success(`🏆 BINGO on card ${cartonIndex + 1}! 🏆`, {
          autoClose: 3000,
          className: "bingo-toast",
          closeOnClick: true,
        });
        newCompletedLines[cartonIndex].bingo = true;
        gameWon = true;
      }
    });

    setCompletedLines(newCompletedLines);

    if (gameWon) {
      setGameOver(true);
      setTimeout(() => {
        setShowRestartScreen(true);
        setTimeout(() => resetGame(), 3000);
      }, 2000);
    }
  };

  const resetGame = () => {
    setShowRestartScreen(true);
    setTimeout(() => {
      setShowRestartScreen(false);
      setGameOver(false);
      setGameStarted(false);
      setNumCartons(null);
      setDrawnNumbers([]);
      setCurrentNumber(null);
      setCartons([]);
      setCompletedLines(
        Array.from({ length: numCartons }, () => ({
          rows: Array(5).fill(false),
          columns: Array(5).fill(false),
          bingo: false,
        }))
      );
      setAutoMode(false);
    }, 2000);
  };

  return (
    <div className={`bingo-game ${gameStarted ? "started" : ""}`}>
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
                <button className="start-button" onClick={startGame}>
                  Start Game
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="auto-mode-container">
                <button
                  className={`auto-mode-button ${autoMode ? "active" : "inactive"}`}
                  onClick={() => setAutoMode(!autoMode)}
                >
                  {autoMode ? "AUTO MODE ON" : "AUTO MODE OFF"}
                </button>
              </div>

              <BingoCartons cartons={cartons} markNumber={markNumberManually} />

              {!gameOver && (
                <div className="bingo-controls">
                  <button className="draw-button" onClick={drawNumber} disabled={isWaiting}>
                    {isWaiting ? "Waiting..." : "Draw Number"}
                  </button>
                  <button onClick={resetGame} className="reset-button">
                    Restart
                  </button>
                </div>
              )}

              {currentNumber && (
                <div className="current-number-container show">
                  <div className="current-number-box">{currentNumber}</div>
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
