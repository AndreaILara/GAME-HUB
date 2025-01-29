import { useState, useEffect } from "react";
import "./BingoBoard.css";
import BingoCartons from "../BingoCartons/BingoCartons";

const BingoBoard = ({ currentNumber, drawnNumbers = [], drawNumber }) => {
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const [selectedCartons, setSelectedCartons] = useState([]);

  // Simulación de números iniciales del tablero de Bingo
  useEffect(() => {
    const initialNumbers = Array.from({ length: 25 }, (_, i) => i + 1); // Genera los números 1-25
    setBingoNumbers(initialNumbers);
  }, []);

  if (!bingoNumbers || bingoNumbers.length === 0) {
    return <p>Loading Bingo Numbers...</p>;
  }

  return (
    <div className="bingo-container">
      <div className="bingo-cartons-container">
        <BingoCartons
          selectedCartons={selectedCartons}
          setSelectedCartons={setSelectedCartons}
        />
      </div>

      <div className="bingo-board">
        {bingoNumbers.map((number) => (
          <button
            key={number}
            className={`bingo-button ${drawnNumbers && drawnNumbers.includes(number) ? "marked" : ""
              }`}
            onClick={() => drawNumber()}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BingoBoard;
