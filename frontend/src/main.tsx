import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./style/index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
