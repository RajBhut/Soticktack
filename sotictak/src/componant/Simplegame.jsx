import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RefreshCcw, Home, XIcon, CircleIcon, TrophyIcon } from "lucide-react";
import { BordSizeContext } from "./Bordsizeprovider";

export default function SimpleGame() {
  const { bordSize, gameCode } = useContext(BordSizeContext);
  const [board, setBoard] = useState(Array(bordSize * bordSize).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const gridStyle = {
    gridTemplateColumns: `repeat(${bordSize}, minmax(0, 1fr))`,
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    checkGameStatus(newBoard);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkGameStatus = (currentBoard) => {
    const lines = [];

    for (let i = 0; i < bordSize; i++) {
      lines.push(currentBoard.slice(i * bordSize, (i + 1) * bordSize));
    }

    for (let i = 0; i < bordSize; i++) {
      const column = [];
      for (let j = 0; j < bordSize; j++) {
        column.push(currentBoard[i + j * bordSize]);
      }
      lines.push(column);
    }

    const diagonal1 = [],
      diagonal2 = [];
    for (let i = 0; i < bordSize; i++) {
      diagonal1.push(currentBoard[i * (bordSize + 1)]);
      diagonal2.push(currentBoard[(i + 1) * (bordSize - 1)]);
    }
    lines.push(diagonal1, diagonal2);

    // Check for winner
    for (let line of lines) {
      if (line.every((cell) => cell === "X")) {
        setWinner("X");
        setShowWinnerModal(true);
        return;
      }
      if (line.every((cell) => cell === "O")) {
        setWinner("O");
        setShowWinnerModal(true);
        return;
      }
    }

    if (currentBoard.every((cell) => cell !== null)) {
      setWinner("Draw");
      setShowWinnerModal(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(bordSize * bordSize).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setShowWinnerModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-blue-800 font-bold">Game Code: </span>
            <span className="bg-blue-100 px-3 py-1 rounded-full">
              {gameCode}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-800 font-bold">Current Turn:</span>
            {currentPlayer === "X" ? (
              <XIcon className="text-red-500" />
            ) : (
              <CircleIcon className="text-blue-500" />
            )}
          </div>
        </div>

        {/* Game Board */}
        <div className="grid gap-2 mb-6" style={gridStyle}>
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !!winner}
              className={`
                aspect-square border-2 rounded-lg 
                flex items-center justify-center 
                transition-all duration-200
                ${
                  cell === "X"
                    ? "bg-red-100 text-red-600"
                    : cell === "O"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {cell === "X" ? <XIcon /> : cell === "O" ? <CircleIcon /> : ""}
            </button>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetGame}
            className="
              bg-gray-200 text-gray-800 
              px-4 py-2 rounded-lg 
              flex items-center 
              hover:bg-gray-300 
              transition-colors
            "
          >
            <RefreshCcw className="mr-2" /> Reset
          </button>
          <Link to="/">
            <button
              className="
                border-2 border-blue-600 text-blue-600 
                px-4 py-2 rounded-lg 
                flex items-center 
                hover:bg-blue-50 
                transition-colors
              "
            >
              <Home className="mr-2" /> Home
            </button>
          </Link>
        </div>

        {/* Winner Modal */}
        {showWinnerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 text-center">
              <TrophyIcon className="mx-auto text-yellow-500 mb-4" size={64} />
              <h2 className="text-2xl font-bold mb-4">
                {winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`}
              </h2>
              <button
                onClick={resetGame}
                className="
                  bg-blue-600 text-white 
                  px-6 py-2 rounded-lg 
                  hover:bg-blue-700 
                  transition-colors
                "
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
