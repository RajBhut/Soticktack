import React from 'react'
import { Route,  BrowserRouter, Routes} from 'react-router-dom';
import Manu from './Manu';
import BordSizeProvider from './Bordsizeprovider';
import Game from './Game';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Signup from './Signup';

<GoogleOAuthProvider clientId="<your_client_id>"></GoogleOAuthProvider>;
export default function ComponantRoutes() {
  return (<>
  <BrowserRouter>
<Routes>

    <Route path='/' exact element={   <BordSizeProvider>
      <Manu />
    </BordSizeProvider>}/>
    <Route path='/game/:code' element={<BordSizeProvider><Game /></BordSizeProvider>}/>
    <Route path='/signup' element={<GoogleOAuthProvider clientId=""> <Signup/>  </GoogleOAuthProvider>}/>
</Routes>

  
  </BrowserRouter>
  
  </>

  )
}
