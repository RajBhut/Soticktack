import React, { createContext } from 'react'
import { useState  } from 'react';

  const BordSizeContext = createContext();
  export { BordSizeContext };
    export default function  BordSizeProvider  ({children}) {
        const [bordSize, setBordSize] = useState(3);
        const [gameName, setGameName] = useState('');
        const [gameCode, setGameCode] = useState('');
        return (
            <BordSizeContext.Provider value={{bordSize, setBordSize , gameCode , gameName ,setGameCode , setGameName}}>
                {children}
            </BordSizeContext.Provider>
        )
    }

    





  
  

