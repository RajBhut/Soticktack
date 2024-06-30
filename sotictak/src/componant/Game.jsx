import React, { useState, useContext, useEffect } from 'react';
import { BordSizeContext } from './Bordsizeprovider';
import { Link } from 'react-router-dom';

export default function Game() {
    const { bordSize } = useContext(BordSizeContext);
    const [board, setBoard] = useState(Array(bordSize * bordSize).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const gridStyle = {
        gridTemplateColumns: `repeat(${bordSize}, minmax(0, 1fr))`
    };

    const handleClick = (index) => {
        if (board[index] || winner) return; // Prevent click if cell is occupied or game is over
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const checkWinner = (board) => {
        const lines = [];
        // Rows
        for (let i = 0; i < bordSize; i++) {
            lines.push(board.slice(i * bordSize, (i + 1) * bordSize));
        }
        // Columns
        for (let i = 0; i < bordSize; i++) {
            const column = [];
            for (let j = 0; j < bordSize; j++) {
                column.push(board[i + j * bordSize]);
            }
            lines.push(column);
        }
        // Diagonals
        const diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < bordSize; i++) {
            diagonal1.push(board[i * (bordSize + 1)]);
            diagonal2.push(board[(i + 1) * (bordSize - 1)]);
        }
        lines.push(diagonal1, diagonal2);
    
        // Check for winner
        for (let line of lines) {
            if (line.every(cell => cell === 'X')) {
                setWinner('X');
                return;
            } else if (line.every(cell => cell === 'O')) {
                setWinner('O');
                return;
            }
        }
    
        // Check for draw
        if (board.every(cell => cell !== null)) {
            setWinner('Draw');
        }
    };

    useEffect(() => {
        if (winner) {
            alert(`Player ${winner} wins!`);
        }
    }, [winner]);

    return (
        <>
            <div className='h1 '>{bordSize}</div>
            <div className="grid w-72 h-72 " style={gridStyle}>
                {board.map((cell, i) => (
                    <button key={i} className=" border text-center" onClick={() => handleClick(i)}>
                        {cell}
                    </button>
                ))}
            </div>
            {winner && <div>Winner: {winner}</div>}
            <Link to="/">Back to Menu</Link>
        </>
    );
}