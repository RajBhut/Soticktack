import React, { useContext } from 'react';
import { BordSizeContext } from './Bordsizeprovider'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
const Manu = () => {
  const { bordSize, setBordSize } = useContext(BordSizeContext);

  return (
    <div>
      Current Board Size: {bordSize}
    
      <button onClick={() => setBordSize(bordSize + 1)}>Increase Board Size</button>
    <button onClick={() => setBordSize(bordSize - 1)}>Decrease Board Size</button>
      <Link to="/game">Start Game</Link>
    </div>
  );
};

export default Manu;