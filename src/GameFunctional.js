import React, { useState } from "react";
import "./Game.css"

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const Square = (props) => {
  return (
    <div className="square" style={squareStyle} {...props}>
      {!!props.value && props.value}
    </div>
  );
};

const Board = () => {
  const [squareValues, setSquareValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [nextPlayer, setNextPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const toggleNextPlayer = () => {
    setNextPlayer((preState) => (preState === "X" ? "O" : "X"));
  };

  const checkWinner = (boardValArr) => {
    const winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < winnerCombinations.length; i++) {
      const [a, b, c] = winnerCombinations[i];
      if (
        !!boardValArr[a] &&
        !!boardValArr[b] &&
        !!boardValArr[c] &&
        boardValArr[a] === boardValArr[b] &&
        boardValArr[a] === boardValArr[c]
      ) {
        return setWinner(boardValArr[a]);
      }
    }
  };

  const handleBoxClick = (boxNo) => {
    if (squareValues[boxNo] === "" && winner === "") {
      let updatedArr = [];
      squareValues.forEach((val, index) => {
        boxNo === index ? updatedArr.push(nextPlayer) : updatedArr.push(val);
      });
      setSquareValues(updatedArr);
      checkWinner(updatedArr);
      toggleNextPlayer();
    } else return;
  };

  const handleResetBoard = () => {
    setSquareValues(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>
        Next player: {nextPlayer}
      </div>
      <div className="winner" style={instructionsStyle}>
        Winner: {!!winner ? winner : "None"}
      </div>
      <button style={buttonStyle} onClick={handleResetBoard}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={squareValues[0]} onClick={() => handleBoxClick(0)} />
          <Square value={squareValues[1]} onClick={() => handleBoxClick(1)} />
          <Square value={squareValues[2]} onClick={() => handleBoxClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squareValues[3]} onClick={() => handleBoxClick(3)} />
          <Square value={squareValues[4]} onClick={() => handleBoxClick(4)} />
          <Square value={squareValues[5]} onClick={() => handleBoxClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squareValues[6]} onClick={() => handleBoxClick(6)} />
          <Square value={squareValues[7]} onClick={() => handleBoxClick(7)} />
          <Square value={squareValues[8]} onClick={() => handleBoxClick(8)} />
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default Game;
