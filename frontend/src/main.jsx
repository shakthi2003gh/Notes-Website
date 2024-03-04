import React from "react";
import ReactDOM from "react-dom/client";
import StateProvider from "./state";
import App from "./App";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
