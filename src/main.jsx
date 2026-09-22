import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@context/ThemeContext";
import App from "@/App";
import "@/index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SpeedInsights />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
