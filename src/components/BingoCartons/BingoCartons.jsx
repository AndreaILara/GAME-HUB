import React from "react";
import "./BingoCartons.css";

const BingoCartons = ({ cartons, markNumber }) => {
  return (
    <div className="bingo-cartons">
      {cartons.map((carton, cartonIndex) => (
        <div key={cartonIndex} className="carton">
          {Object.keys(carton).map((column) => (
            <div key={column} className="carton-column">
              <h3>{column}</h3>
              {carton[column].map((num, rowIndex) => (
                <span
                  key={rowIndex}
                  className={`carton-number ${num === "X" ? "marked" : ""}`}
                  onClick={() => markNumber(cartonIndex, column, rowIndex)}
                >
                  {num}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BingoCartons;

