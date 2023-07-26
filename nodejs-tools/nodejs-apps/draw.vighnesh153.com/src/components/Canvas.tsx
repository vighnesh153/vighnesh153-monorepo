import { useRef } from 'react';

import { useCanvasMouseEventsHandlers, useEventProcessor } from '../hooks';

export function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onMouseDown, onMouseMove, onMouseUp } = useCanvasMouseEventsHandlers({ canvasRef });

  /**
   * Processes the events ❤️ 😇 🥺
   */
  useEventProcessor({ canvasRef });

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        position: 'relative',
        display: 'block',
        margin: 'auto',
        border: '10px solid black',
      }}
    >
      {`Your browser doesn't seem to support canvas. Please update your browser or try opening in a different browser`}
    </canvas>
  );
}
