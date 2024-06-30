import React from 'react'
import { Route,  BrowserRouter, Routes} from 'react-router-dom';
import Manu from './Manu';
import BordSizeProvider from './Bordsizeprovider';
import Game from './Game';
export default function ComponantRoutes() {
  return (<>
  <BrowserRouter>
<Routes>

    <Route path='/' exact element={   <BordSizeProvider>
      <Manu />
    </BordSizeProvider>}/>
    <Route path='/game' element={<BordSizeProvider><Game/></BordSizeProvider>}/>
</Routes>

  
  </BrowserRouter>
  
  </>

  )
}
