import React from "react";

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

class Square extends React.Component {
  render() {
    return (
      <div className="square" style={squareStyle} {...this.props}>
        {!!this.props.value && this.props.value}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareValues: ["", "", "", "", "", "", "", "", ""],
      nextPlayer: "X",
      winner: "",
    };
    this.handleBoxClick = this.handleBoxClick.bind(this);
    this.toggleNextPlayer = this.toggleNextPlayer.bind(this);
    this.handleResetBoard = this.handleResetBoard.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
  }
  toggleNextPlayer = () => {
    this.setState({ nextPlayer: this.state.nextPlayer === "X" ? "O" : "X" });
  };

  checkWinner = (boardValArr) => {
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
        return this.setState({ winner: boardValArr[a] });
      }
    }
  };

  handleBoxClick = (boxNo) => {
    const { nextPlayer, squareValues, winner } = this.state;
    if (squareValues[boxNo] === "" && winner === "") {
      let updatedArr = [];
      squareValues.forEach((val, index) => {
        boxNo === index ? updatedArr.push(nextPlayer) : updatedArr.push(val);
      });
      this.setState({ squareValues: updatedArr });
      this.checkWinner(updatedArr);
      this.toggleNextPlayer();
    } else return;
  };

  handleResetBoard = () => {
    this.setState({
      squareValues: ["", "", "", "", "", "", "", "", ""],
      winner: "",
    });
  };

  render() {
    const { squareValues, nextPlayer, winner } = this.state;
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>
          Next player: {nextPlayer}
        </div>
        <div className="winner" style={instructionsStyle}>
          Winner: {!!winner ? winner : "None"}
        </div>
        <button style={buttonStyle} onClick={this.handleResetBoard}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square
              value={squareValues[0]}
              onClick={() => this.handleBoxClick(0)}
            />
            <Square
              value={squareValues[1]}
              onClick={() => this.handleBoxClick(1)}
            />
            <Square
              value={squareValues[2]}
              onClick={() => this.handleBoxClick(2)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              value={squareValues[3]}
              onClick={() => this.handleBoxClick(3)}
            />
            <Square
              value={squareValues[4]}
              onClick={() => this.handleBoxClick(4)}
            />
            <Square
              value={squareValues[5]}
              onClick={() => this.handleBoxClick(5)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              value={squareValues[6]}
              onClick={() => this.handleBoxClick(6)}
            />
            <Square
              value={squareValues[7]}
              onClick={() => this.handleBoxClick(7)}
            />
            <Square
              value={squareValues[8]}
              onClick={() => this.handleBoxClick(8)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
