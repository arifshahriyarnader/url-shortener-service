import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UrlProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UrlProvider>
      <App />
    </UrlProvider>
  </StrictMode>
);
