import { useEffect, useRef, useState } from "react";
import {
  CanvasWrapperImpl,
  FlappyBlockGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function FlappyBlockGameRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<FlappyBlockGame>();

  const handleKeyDown: React.KeyboardEventHandler<HTMLCanvasElement> = (e) => {
    if (e.key === " ") {
      game?.handleSpacebarPress();
    }
    if (e.key === "Enter") {
      game?.handleEnterPress();
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const gameInstance = new FlappyBlockGame(canvasWrapper);
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
      tabIndex={0}
      ref={canvasRef}
      onKeyDown={handleKeyDown}
    >
      Sorry your browser doesn't support the canvas element
    </canvas>
  );
}
