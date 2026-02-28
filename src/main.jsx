import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";
import RestorePendingActions from "./components/RestorePendingActions.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <AuthProvider>
          <RestorePendingActions />
            <App />
          <RestorePendingActions />
        </AuthProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);