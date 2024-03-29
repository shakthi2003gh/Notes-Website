import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import StateProvider from "./state";
import Popup from "./layouts/popup";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <Popup>
        <App />
        <ToastContainer />
      </Popup>
    </StateProvider>
  </React.StrictMode>
);
