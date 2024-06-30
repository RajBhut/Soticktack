import React, { createContext } from 'react'
import { useState  } from 'react';

  const BordSizeContext = createContext();
  export { BordSizeContext };
    export default function  BordSizeProvider  ({children}) {
        const [bordSize, setBordSize] = useState(3);
        return (
            <BordSizeContext.Provider value={{bordSize, setBordSize}}>
                {children}
            </BordSizeContext.Provider>
        )
    }

    





  
  

