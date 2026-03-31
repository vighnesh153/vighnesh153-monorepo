import { useEffect, useRef } from "react";

import {
  CanvasWrapperImpl,
  TwinklingStarsGame,
} from "@vighnesh153/tools-browser/graphics_programming";

export function TwinklingStarsRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const game = new TwinklingStarsGame(canvasWrapper);
    const frames = game.start();
    function showNextFrame() {
      if (!frames.next().done) {
        requestAnimationFrame(showNextFrame);
      }
    }
    showNextFrame();
  }, []);

  return (
    <>
      <canvas
        className="mt-6 mx-auto w-full max-w-3xl aspect-video bg-text"
        ref={canvasRef}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
