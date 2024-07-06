import React, { useState, useContext, useEffect } from 'react';
import { BordSizeContext } from './Bordsizeprovider';
import { Link } from 'react-router-dom';



export default function SimpleGame({code}) {



    const [gameId, setGameId] = useState('');
    const [userId, setUserId] = useState('');
   
    const { bordSize  , gameCode} = useContext(BordSizeContext);
    const [board, setBoard] = useState(Array(bordSize * bordSize).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
const[showpopup , setShowpopup] = useState(false);
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
    
      
        if (board.every(cell => cell !== null)) {
            setWinner('Draw');
           
        }
    };  
    

    useEffect(() => {

      



        if (winner) {
            setShowpopup(true);
           
        }
    }, [winner,userId,setUserId]);

    return (
        <>
        <div className='h-screen w-screen flex justify-center items-center flex-col bg-slate-400 '>
<h1 className='mb-3'>Code: {gameCode}</h1>
<input className='border-2 p-1 bg-slate-300 shadow-lg'
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
<h2 className='border-2 p-1 bg-slate-300 shadow-lg'> player : {currentPlayer}</h2>
           
            <div className="grid mt-3 " style={gridStyle}>
                {board.map((cell, i) => (
                    <button key={i} className="border h-16 w-16 text-center" style={{backgroundColor: cell === 'X' ? 'red' : cell === 'O' ? 'blue' : '#f9f9f9' , fontSize:30} } onClick={() => handleClick(i)}>
                   {cell}
               </button>
                ))}
            </div>
            {winner && <div>Winner: {winner}</div>}
          
            <button className='drop-shadow-lg p-2 m-3 rounded-md bg-slate-200' onClick={()=>{
                setBoard(Array(bordSize * bordSize).fill(null));
                
                setWinner(null);
                
            }}>Reset</button>
            <Link  to="/"><button className='shadow-xl rounded-md p-2 m-1 bg-slate-200'>Back to Home</button></Link>
                </div>
                {showpopup &&  <div className='shadow-2xl fixed inset-0 bg-black/50 flex justify-center items-center'>
                    <div className=' flex flex-col items-center justify-center bg-slate-200 p-5 w-52 h-40 rounded-md'>
                        <h1>{ ((winner==='O')||(winner ==='X'))?`Player ${winner} wins!`:'Draw'}</h1>
                        <button className="z-auto border-black bg-slate-400 rounded-md p-2 mt-3 text-center" onClick={()=>{setShowpopup(false)
                            setBoard(Array(bordSize * bordSize).fill(null));
                           
                            setWinner(null);    
                        }}>Close</button>
                    </div>
                </div>} 
        </>
    );
}