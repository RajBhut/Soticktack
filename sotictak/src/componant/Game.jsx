import React, { useState, useContext, useEffect } from 'react';
import { BordSizeContext } from './Bordsizeprovider';
import { Link } from 'react-router-dom';



export default function Game({code}) {




    const { bordSize  , gameCode} = useContext(BordSizeContext);
    const [board, setBoard] = useState(Array(bordSize * bordSize).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const gridStyle = {
        gridTemplateColumns: `repeat(${bordSize}, minmax(0, 1fr))`
    };

    const handleClick = (index) => {
        if (board[index] || winner) return; 
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const checkWinner = (board) => {
        const lines = [];
  
        for (let i = 0; i < bordSize; i++) {
            lines.push(board.slice(i * bordSize, (i + 1) * bordSize));
        }
        
        for (let i = 0; i < bordSize; i++) {
            const column = [];
            for (let j = 0; j < bordSize; j++) {
                column.push(board[i + j * bordSize]);
            }
            lines.push(column);
        }
        
        const diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < bordSize; i++) {
            diagonal1.push(board[i * (bordSize + 1)]);
            diagonal2.push(board[(i + 1) * (bordSize - 1)]);
        }
        lines.push(diagonal1, diagonal2);
    
    
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
    useEffect(()=>{

        
        
    },[])

    useEffect(() => {

        if (winner) {
            alert(`Player ${winner} wins!`);
        }
    }, [winner]);

    return (
        <>
        <div className='h-screen w-screen flex justify-center items-center flex-col bg-slate-400 '>
<h1 className='mb-3'>Code: {gameCode}</h1>
           
            <div className="grid  " style={gridStyle}>
                {board.map((cell, i) => (
                    <button key={i} className="border h-16 w-16 text-center" style={{backgroundColor: cell === 'X' ? 'red' : cell === 'O' ? 'blue' : '#f9f9f9' , fontSize:30} } onClick={() => handleClick(i)}>
                   {cell}
               </button>
                ))}
            </div>
            {winner && <div>Winner: {winner}</div>}
           
            <Link  to="/"><button className='p-2 m-10 bg-slate-200'>Back to Home</button></Link>
                </div>
        </>
    );
}