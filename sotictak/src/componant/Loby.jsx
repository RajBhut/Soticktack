import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./Socketprovider";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [hostgameid, sethostgameid] = useState("");
  const [userId, setUserId] = useState("");
  const [availableGames, setAvailableGames] = useState({});

  const generateString = () => {
    return (
      Math.random().toString(36).substring(2, 7) +
      Math.random().toString(36).substring(2, 7)
    );
  };

  useEffect(() => {
    setUserId(generateString());
    sethostgameid(generateString());
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleAvailableGames = (data) => {
      setAvailableGames(data);
      console.log(data);
    };
    socket.on("game_full", () => {});
    socket.on("avalable_games_out", handleAvailableGames);

    socket.emit("get_available_games");

    return () => {
      socket.off("avalable_games_out", handleAvailableGames);
    };
  }, [socket]);

  const handleCreateGame = () => {
    if (socket) {
      socket.emit("join", { userId, gameId: hostgameid });
      navigate(`/game/${hostgameid}`);
    }
  };

  const handleFetchGames = () => {
    if (socket) {
      socket.emit("get_available_games");
    }
  };

  const handleEnterGame = (selectedGameId) => {
    if (socket) {
      socket.emit("join", {
        userId,
        gameId: selectedGameId,
      });
      navigate(`/game/${selectedGameId}`);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center py-5 text-4xl font-mono bg-slate-200 rounded-md w-full">
        Lobby
      </h1>
      <div></div>
      <div>
        <button
          className="bg-black text-white p-3 rounded-lg m-4"
          onClick={handleCreateGame}
        >
          Create Game
        </button>
        <button
          className="border border-solid p-3 rounded-lg m-4"
          onClick={handleFetchGames}
        >
          Fetch Games
        </button>
      </div>
      <div>
        <h2>Available Games</h2>
        {Object.keys(availableGames).length === 0 ? (
          <p>No available games</p>
        ) : (
          <ul className="w-full">
            {Object.keys(availableGames).map((gameId) => (
              <li
                key={gameId}
                onClick={() => handleEnterGame(gameId)}
                className="bg-gray-500 p-3 m-2 rounded text-white"
              >
                {gameId}{" "}
                <span className="float-right">
                  - Host: {availableGames[gameId].host}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
