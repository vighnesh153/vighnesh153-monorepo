import { RefObject, useEffect } from 'react';
import { not, Queue } from '@vighnesh153/utils';

import { CanvasHelper, colorToRgba, RGBA } from '../utils';
import { useProcessingQueueRef } from '../contexts';

export interface UseEventProcessorProps {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const useEventProcessor = ({ canvasRef }: UseEventProcessorProps) => {
  const processingQueueRef = useProcessingQueueRef();

  useEffect(() => {
    let mounted = true;
    const canvasCtx = new CanvasHelper(canvasRef.current!, {
      width: Math.min(800, window.innerWidth - 16 * 2),
      height: Math.min(600, window.innerHeight),
    });

    const processEventsFromQueue = () => {
      const queue = processingQueueRef.current;

      requestAnimationFrame(processEventsFromQueue);
      if (not(mounted)) return;
      if (not(canvasCtx)) return;

      while (not(queue.isEmpty)) {
        const event = queue.popLeft()!;

        switch (event.type) {
          case 'point': {
            const { color, coordinates, brushThickness } = event;
            canvasCtx?.drawFilledCircle(coordinates.x, coordinates.y, brushThickness / 2, color);
            break;
          }
          case 'line': {
            const { color, brushThickness, coordinate1: c1, coordinate2: c2 } = event;
            canvasCtx?.drawLine(c1.x, c1.y, c2.x, c2.y, brushThickness, color);
            break;
          }
          case 'clear': {
            const { color } = event;
            canvasCtx?.drawFilledRect(0, 0, canvasCtx?.width, canvasCtx?.height, color);
            break;
          }
          case 'fill': {
            const { coordinates: c, color } = event;
            const canvasWidth = canvasCtx!.width;

            // Initial pixel information for the entire canvas. Doing it this way because invoking
            // getImageData several times is expensive than just doing it once
            const canvasPixelData = canvasCtx!.getImageData(0, 0, canvasCtx!.width, canvasCtx!.height);

            // returns the indices for the r,g,b,a components of the colors of the provided pixel coordinates
            const getColorIndicesForPixel = (
              x: number,
              y: number
            ): { rIndex: number; gIndex: number; bIndex: number; aIndex: number } => {
              const rIndex = y * (canvasWidth * 4) + x * 4;
              const [gIndex, bIndex, aIndex] = [rIndex + 1, rIndex + 2, rIndex + 3];

              return { rIndex, gIndex, bIndex, aIndex };
            };

            const getColorForPixel = (x: number, y: number) => {
              const { rIndex, gIndex, bIndex, aIndex } = getColorIndicesForPixel(x, y);
              const r = canvasPixelData.data[rIndex];
              const g = canvasPixelData.data[gIndex];
              const b = canvasPixelData.data[bIndex];
              const a = canvasPixelData.data[aIndex];
              return { r, g, b, a };
            };

            const areColorsEqual = (color1: RGBA, color2: RGBA) => {
              if (color1.r !== color2.r) return false;
              if (color1.g !== color2.g) return false;
              if (color1.b !== color2.b) return false;
              if (color1.a !== color2.a) return false;
              return true;
            };

            // Color of the starting pixel
            const initialColor = getColorForPixel(c.x, c.y);
            const newColor = colorToRgba(color);

            // In the pixel data, "alpha" needs to be between (0 and 255)
            newColor.a *= 255;

            // set of all the nodes that are already visited
            const visitedNodes: Record<number, Record<number, boolean>> = {};
            const pixelQueue = new Queue([c.x, c.y]);

            // Implementation of BFS algorithm for filling colors in
            // the region
            while (not(pixelQueue.isEmpty)) {
              const [x, y] = pixelQueue.popLeft()!;

              const { rIndex, gIndex, bIndex, aIndex } = getColorIndicesForPixel(x, y);

              // if index out of bounds, return
              if (x < 0 || x >= canvasCtx!.width || y < 0 || y >= canvasCtx!.height) continue;

              // if color is not same as initial color, return
              if (not(areColorsEqual(getColorForPixel(x, y), initialColor))) continue;

              // if already visited, return
              if (visitedNodes[x]?.[y]) continue;

              // Add to visited nodes
              visitedNodes[x] = visitedNodes[x] || ({} as Record<number, boolean>);
              visitedNodes[x][y] = true;

              // update the color in pixel data
              canvasPixelData.data[rIndex] = newColor.r;
              canvasPixelData.data[gIndex] = newColor.g;
              canvasPixelData.data[bIndex] = newColor.b;
              canvasPixelData.data[aIndex] = newColor.a;

              // fill the surrounding nodes
              pixelQueue.pushRight([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
            }

            // update the canvas with the new color values
            canvasCtx!.putImageData(canvasPixelData, 0, 0);

            break;
          }
          default: {
            throw new Error(`Invalid event: ${event}`);
          }
        }
      }
    };

    processEventsFromQueue();
    return () => {
      mounted = false;
    };
  }, [canvasRef, processingQueueRef]);
};
