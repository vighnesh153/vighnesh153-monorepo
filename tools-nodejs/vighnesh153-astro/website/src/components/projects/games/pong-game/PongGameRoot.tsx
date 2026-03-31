import { useEffect, useRef, useState } from "react";
import {
  CanvasWrapperImpl,
  PongGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function PongGameRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<PongGame>();

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    game?.handleMouseMove(e as unknown as MouseEvent, document.documentElement.scrollTop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const gameInstance = new PongGame(canvasWrapper);
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
      onMouseMove={handleMouseMove}
    >
      Sorry your browser doesn't support the canvas element
    </canvas>
  );
}
