import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Manu from "./Manu";
import BordSizeProvider from "./Bordsizeprovider";
import Game from "./Game";

import Deshbord from "./Deshbord";
import SimpleGame from "./Simplegame";
import Socketprovider from "./Socketprovider";
import Loby from "./Loby";

export default function ComponantRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <BordSizeProvider>
                <Manu />
              </BordSizeProvider>
            }
          />
          <Route
            path="/sim"
            element={
              <BordSizeProvider>
                <SimpleGame />
              </BordSizeProvider>
            }
          />
          <Route path="/desh" element={<Deshbord />} />
          <Route
            path="/game/:gameId"
            element={
              <BordSizeProvider>
                <Game />
              </BordSizeProvider>
            }
          />
          <Route path="/loby" element={<Loby />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
