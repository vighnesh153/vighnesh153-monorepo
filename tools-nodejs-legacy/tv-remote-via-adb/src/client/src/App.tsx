import { useEffect } from "react";
import { theme } from "./theme.tsx";
import { HomePage } from "./HomePage.tsx";

export function App() {
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.primary.dark;
  }, []);
  return <HomePage />;
}
