import { useEffect } from "react";
import { theme } from "./theme";
import { HomePage } from "./HomePage";

export function App() {
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.primary.dark;
  }, []);
  return <HomePage />;
}
