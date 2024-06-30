import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [bordsize, setBordsize] = useState(3);
  const [board, setBoard] = useState(Array(bordsize).fill(Array(bordsize).fill(null)));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [history, setHistory] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [sort, setSort] = useState(false);
  const [winningLine, setWinningLine] = useState([]);
  const [winningPlayer, setWinningPlayer] = useState(null);


  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const newBoard = board.map((r, i) => r.map((c, j) => (i === row && j === col ? player : c)));
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
    setHistory([...history.slice(0, stepNumber + 1), newBoard]);
    setStepNumber(history.length);
  }

  return (  <>
  
 
    
    <h1 className="text-4xl text-center font-bold text-slate-400">Tic Tac Toe</h1>

  
    <div className="grid grid-cols-3 gap-4 w-72 h-72 bg-slate-400 p-2 rounded-md">
      <button className="w-full h-full border text-center">X</button>
      <button className="w-full h-full border text-center"></button>
      <button className="w-full h-full border text-center">O</button>
      <button className="w-full h-full border text-center">X</button>
      <button className="w-full h-full border text-center"></button>
      <button className="w-full h-full border text-center">O</button>
       <button className="w-full h-full border text-center">X</button>
      <button className="w-full h-full border text-center"></button>
      <button className="w-full h-full border text-center">O</button>
    
      
    </div>
 
   
      
      
    </>
  )
}

export default App    
