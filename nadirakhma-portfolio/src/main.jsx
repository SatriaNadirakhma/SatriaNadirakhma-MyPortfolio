import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@context/ThemeContext";
import App from "@/App";
import "@/index.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SpeedInsights />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
