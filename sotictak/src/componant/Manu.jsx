import React, { useContext } from 'react';
import { BordSizeContext } from './Bordsizeprovider'; 
import { Link } from 'react-router-dom';
const Manu = () => {
  const { bordSize, setBordSize ,  gameCode , gameName ,setGameCode , setGameName } = useContext(BordSizeContext);

  return (
    <div className='h-screen w-screen bg-slate-400 flex justify-center items-center '>
      <div className='bg-slate-200 w-60 h-72 p-3 m-2 rounded-md flex flex-col gap-2 align-middle items-center'>

      Current Board Size: {bordSize}
    <input type="text" className='w-30px h-20px p-2 font-extralight' placeholder='input name of game' required={true} value={gameName} onChange={(e)=>setGameName(e.target.value)} />
    <input type="text" className='w-30px h-20px p-2 font-extralight' placeholder='input code' required={true} value={gameCode} onChange={(e)=>setGameCode(e.target.value)} />
     
      <button className=' p-1 w-20px h-20px bg-slate-500 text-white border' onClick={() => setBordSize(bordSize + 1)}>Increase Board Size</button>
    <button className=' p-1 w-20px h-20px' onClick={() => setBordSize(bordSize - 1)}>Decrease Board Size</button>
      <Link  to={`/game/${gameCode}`}><button className=' p-1 text-cyan-50 bg-zinc-500'>Start Game</button></Link>
      </div>
    </div>
  );
};

export default Manu;