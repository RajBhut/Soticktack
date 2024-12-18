import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Socketprovider from "./componant/Socketprovider";
import ComponantRoutes from "./componant/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ComponantRoutes />
);
