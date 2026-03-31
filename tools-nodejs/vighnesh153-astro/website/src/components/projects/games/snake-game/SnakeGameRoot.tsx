import { useEffect, useRef, useState } from "react";
import {
  CanvasWrapperImpl,
  SnakeGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function SnakeGameRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<SnakeGame>();

  const keyupEventListener: React.KeyboardEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    if (["ArrowDown", "s", "S"].includes(e.key)) {
      game?.changeDirection("bottom");
    } else if (["ArrowUp", "w", "W"].includes(e.key)) {
      game?.changeDirection("top");
    } else if (["ArrowLeft", "a", "A"].includes(e.key)) {
      game?.changeDirection("left");
    } else if (["ArrowRight", "d", "D"].includes(e.key)) {
      game?.changeDirection("right");
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const gameInstance = new SnakeGame(canvasWrapper);
    canvasRef.current.focus();
    const frames = gameInstance.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();

    setGame(gameInstance);
  }, []);

  return (
    <canvas
      className="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
      ref={canvasRef}
      onKeyUp={keyupEventListener}
      tabIndex={0}
    >
      Sorry your browser doesn't support the canvas element
    </canvas>
  );
}
