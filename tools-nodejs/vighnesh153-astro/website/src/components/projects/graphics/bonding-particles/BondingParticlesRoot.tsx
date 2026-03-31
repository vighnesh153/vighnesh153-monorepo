import { useEffect, useRef, useState } from "react";
import {
  BondingParticlesGame,
  CanvasWrapperImpl,
} from "@vighnesh153/tools-browser/graphics_programming";

export function BondingParticlesRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [game, setGame] = useState<BondingParticlesGame>();

  const onMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const root = document.documentElement;

    const mouseX = e.clientX - rect.left - root.scrollLeft;
    const mouseY = e.clientY - rect.top - root.scrollTop;

    game?.updateMousePosition({ x: mouseX, y: mouseY });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasWrapper = new CanvasWrapperImpl(canvasRef.current);
    const gameInstance = new BondingParticlesGame(canvasWrapper);

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
    <>
      <p className="-mt-6 italic text-center text-text2">
        (Use your mouse to dislodge particles)
      </p>
      <canvas
        className="mt-4 mx-auto w-full max-w-3xl aspect-video bg-text"
        ref={canvasRef}
        onMouseMove={onMouseMove}
      >
        Sorry your browser doesn't support the canvas element
      </canvas>
    </>
  );
}
