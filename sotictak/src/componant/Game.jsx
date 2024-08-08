import React, { useState, useContext, useEffect } from 'react';
import { BordSizeContext } from './Bordsizeprovider';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('https://soticktack-51cca34e027d.herokuapp.com/');

export default function Game() {


const [Me , SetMe] = useState('');
const [You , SetYou] = useState('');

    const [gameId, setGameId] = useState('');
    const [userId, setUserId] = useState('');
    const [messages, setMessages] = useState([]);
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
        socket.emit('move', { gameId, userId, index, currentPlayer });
        checkWinner(newBoard);

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };
    const joinGame = () => {
        if (gameId ) {
          socket.emit('join', { userId, gameId , player:Me });
          
        } else {
          alert('Both User name required');
        }
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
                socket.emit('gameOver', { gameId, userId, winner: 'X' });
                return;
            } else if (line.every(cell => cell === 'O')) {
                setWinner('O');
                socket.emit('gameOver', { gameId, userId, winner: 'O' });
                return;
            }
        }
    
      
        if (board.every(cell => cell !== null)) {
            setWinner('Draw');
            socket.emit('gameOver', { gameId, userId, winner: 'Draw' });

        }
    };  
    useEffect(() => {
        setBoard(Array(bordSize * bordSize).fill(null));
        socket.emit('reset', { gameId, userId });
        setWinner(null);

socket.on('updateBoard', ({ index, currentPlayer }) => {
    console.log('move', index, currentPlayer);
    setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        if (!newBoard[index] && !winner) {
          newBoard[index] = currentPlayer;
          checkWinner(newBoard); 
          return newBoard;
        }
        return prevBoard;
      });

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    });
socket.on('reset', () => {
    setBoard(Array(bordSize * bordSize).fill(null));
    setWinner(null);
    setCurrentPlayer('X');
    });
socket.on('gameOver', ({ winner }) => {
    setWinner(winner);

    });

        socket.on('playerJoined', (data) => {
SetYou(data.player);
          
        });
    
        socket.on('playerLeft', (userId) => {
          setMessages((prev) => [...prev, `User ${userId} has left the game.`]);
        });
    
        socket.on('gameFull', (message) => {
          alert(message);
        });
    
        return () => {
          socket.off('playerJoined');
          socket.off('playerLeft');
          socket.off('gameFull');
        };
      }, [socket]);

    useEffect(() => {

        if (Me == '') {
            let temme = window.prompt("Please enter your name:", "");
SetMe(temme);
         }




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
            <button className='drop-shadow-lg p-2 m-3 rounded-md bg-slate-200' onClick={joinGame}>Join Game</button>
            <button className='drop-shadow-lg p-2 m-3 rounded-md bg-slate-200' onClick={()=>{
                setBoard(Array(bordSize * bordSize).fill(null));
                socket.emit('reset', { gameId, userId });
                setWinner(null);
                
            }}>Reset</button>
            <Link  to="/"><button className='shadow-xl rounded-md p-2 m-1 bg-slate-200'>Back to Home</button></Link>
                </div>
                {showpopup &&  <div className='shadow-2xl fixed inset-0 bg-black/50 flex justify-center items-center'>
                    <div className=' flex flex-col items-center justify-center bg-slate-200 p-5 w-52 h-40 rounded-md'>
                        <h1>{ ((winner==='O')||(winner ==='X'))?`Player ${winner} wins!`:'Draw'}</h1>
                        <button className="z-auto border-black bg-slate-400 rounded-md p-2 mt-3 text-center" onClick={()=>{setShowpopup(false)
                            setBoard(Array(bordSize * bordSize).fill(null));
                            socket.emit('reset', { gameId, userId });
                            setWinner(null);    
                        }}>Close</button>
                    </div>
<span>
    {
        Me ? <div>Me: {Me}</div> : null 
    }
</span>
<span>
    {
        You ? <div>Opponant: {You}</div> : null 
    }
</span>
<span>
    {messages.map((message, i) => (
      <div key={i}>{message}</div>
    ))}
</span>

                </div>} 
        </>
    );
}
