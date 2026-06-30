import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PikaButton } from "@vighnesh153/react-material3-expressive";

function App() {
  return (
    <div>
      <h1>Vite App</h1>
      <PikaButton />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
