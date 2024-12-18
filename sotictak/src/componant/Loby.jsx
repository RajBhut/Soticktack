import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BordSizeContext } from "./Bordsizeprovider";
import { SocketContext } from "./Socketprovider";
import { PlusCircle, RefreshCcw, Users } from "lucide-react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center 
        px-4 py-2 rounded-lg 
        transition-all duration-200 
        ${variantStyles[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};
const Lobby = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [hostgameid, sethostgameid] = useState("");
  const [userId, setUserId] = useState("");
  const [availableGames, setAvailableGames] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const generateString = () =>
    Math.random().toString(36).substring(2, 7) +
    Math.random().toString(36).substring(2, 7);

  useEffect(() => {
    setUserId(generateString());
    sethostgameid(generateString());
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleAvailableGames = (data) => {
      setAvailableGames(data);
      setIsLoading(false);
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
      setIsLoading(true);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
          <Users className="inline-block mr-2" size={32} /> Game Lobby
        </h1>

        <div className="flex space-x-4 mb-6 justify-center">
          <Button
            onClick={handleCreateGame}
            variant="primary"
            className="flex-1"
          >
            <PlusCircle className="mr-2" /> Create Game
          </Button>
          <Button
            onClick={handleFetchGames}
            variant="secondary"
            className="flex-1"
            disabled={isLoading}
          >
            <RefreshCcw className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Fetch Games"}
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Available Games
          </h2>
          {isLoading ? (
            <div className="text-center text-gray-500">Loading games...</div>
          ) : Object.keys(availableGames).length === 0 ? (
            <div className="text-center text-gray-500">No available games</div>
          ) : (
            <div className="space-y-4">
              {Object.keys(availableGames).map((gameId) => (
                <div
                  key={gameId}
                  onClick={() => handleEnterGame(gameId)}
                  className="
                    bg-blue-100 p-4 rounded-lg 
                    hover:bg-blue-200 cursor-pointer 
                    transition-colors duration-200
                    flex justify-between items-center
                  "
                >
                  <span className="font-medium text-blue-800">
                    Game ID: {gameId}
                  </span>
                  <span className="text-blue-600">
                    Host: {availableGames[gameId].host}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Lobby;
