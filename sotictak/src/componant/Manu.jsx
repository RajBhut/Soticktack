import React, { useContext, useState, useEffect } from "react";
import { BordSizeContext } from "./Bordsizeprovider";
import { Link } from "react-router-dom";

const Manu = () => {
  const [showpopup, setShowpopup] = useState(false);
  const { bordSize, setBordSize } = useContext(BordSizeContext);

  return (
    <>
      <div className="h-screen w-screen bg-slate-400 flex justify-center items-center ">
        <div className="bg-slate-200 w-60 h-72 p-3 m-2 rounded-md flex flex-col gap-2 align-middle items-center">
          Current Board Size: {bordSize}
          <button
            className=" p-1 w-20px h-20px bg-slate-500 text-white border"
            onClick={() => {
              if (bordSize < 8) {
                setBordSize(bordSize + 1);
              }
            }}
          >
            Increase Board Size
          </button>
          <button
            className=" p-1 w-20px h-20px text-slate-500 bg-white"
            onClick={() => {
              if (bordSize > 3) {
                setBordSize(bordSize - 1);
              }
            }}
          >
            Decrease Board Size
          </button>
          <button
            className=" p-1 text-cyan-50 bg-zinc-500"
            onClick={() => {
              setShowpopup(true);
            }}
          >
            Start Game
          </button>
        </div>
      </div>
      {showpopup && (
        <div className="shadow-2xl fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className=" flex flex-col items-center justify-center bg-slate-200 p-5 w-52 h-40 rounded-md">
            <h1>Choose Mode</h1>
            <button className="z-auto border-black bg-slate-400 rounded-md p-2 mt-3 text-center">
              <Link to={"/sim"}>Local </Link>{" "}
            </button>
            <button className="z-auto border-black bg-slate-400 rounded-md p-2 mt-3 text-center">
              <Link to={"/loby"}>Online </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Manu;
