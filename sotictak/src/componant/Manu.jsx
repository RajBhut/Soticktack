import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BordSizeContext } from "./Bordsizeprovider";

import {
  ChevronUp,
  ChevronDown,
  GamepadIcon,
  PlusCircle,
  RefreshCcw,
  Users,
} from "lucide-react";

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

const Menu = () => {
  const [showpopup, setShowpopup] = useState(false);
  const { bordSize, setBordSize } = useContext(BordSizeContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-80 p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            <GamepadIcon className="inline-block mr-2" size={32} />
            Game Settings
          </h1>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">
              Board Size: {bordSize}x{bordSize}
            </span>
            <div className="flex space-x-2">
              <Button
                onClick={() => bordSize < 8 && setBordSize(bordSize + 1)}
                disabled={bordSize >= 8}
                variant="secondary"
              >
                <ChevronUp size={20} />
              </Button>
              <Button
                onClick={() => bordSize > 3 && setBordSize(bordSize - 1)}
                disabled={bordSize <= 3}
                variant="secondary"
              >
                <ChevronDown size={20} />
              </Button>
            </div>
          </div>

          <Button onClick={() => setShowpopup(true)} className="w-full">
            Start Game
          </Button>
        </div>

        {showpopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 text-center space-y-4 shadow-2xl">
              <h2 className="text-xl font-bold text-blue-800">
                Choose Game Mode
              </h2>
              <div className="flex space-x-4 justify-center">
                <Link to={"/sim"}>
                  <Button variant="outline" className="flex-1">
                    <Users className="mr-2" /> Local
                  </Button>
                </Link>
                <Link to={"/loby"}>
                  <Button variant="outline" className="flex-1">
                    <PlusCircle className="mr-2" /> Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Menu;
