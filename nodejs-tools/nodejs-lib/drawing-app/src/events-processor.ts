import { not, Queue } from '@vighnesh153/utils';

import type { DrawPointEvent, AppEvent, DrawLineEvent, ClearScreenEvent, FloodFillEvent } from './events';
import { CanvasWrapper } from './CanvasWrapper';
import { IColor } from './colors';

// returns the indices for the r,g,b,a components of the colors of the provided pixel coordinates
function getRedColorIndicesForPixel(canvasWidth: number, x: number, y: number): number {
  const pixelsOnSingleRow = canvasWidth * 4; // 1 for each (r,g,b,a)
  const rIndex = Math.round(y) * pixelsOnSingleRow + Math.round(x) * 4;
  return rIndex;
}

function getColorForPixel(canvasPixelData: ImageData, x: number, y: number): IColor['rgba'] {
  const rIndex = getRedColorIndicesForPixel(canvasPixelData.width, x, y);
  const gIndex = rIndex + 1;
  const bIndex = rIndex + 2;
  const aIndex = rIndex + 3;
  const r = canvasPixelData.data[rIndex];
  const g = canvasPixelData.data[gIndex];
  const b = canvasPixelData.data[bIndex];
  const a = canvasPixelData.data[aIndex];
  return { r, g, b, a };
}

function areColorsEqual(color1: IColor['rgba'], color2: IColor['rgba']): boolean {
  if (color1.r !== color2.r) return false;
  if (color1.g !== color2.g) return false;
  if (color1.b !== color2.b) return false;
  if (color1.a !== color2.a) return false;
  return true;
}

function processDrawPointEvent(canvasWrapper: CanvasWrapper, event: DrawPointEvent): void {
  const { color, brushThickness, point } = event;
  canvasWrapper.drawFilledCircle(point.x, point.y, brushThickness / 2, color.rgbaString);
}

function processDrawLineEvent(canvasWrapper: CanvasWrapper, event: DrawLineEvent): void {
  const { color, brushThickness, startPoint, endPoint } = event;
  canvasWrapper.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, brushThickness, color.rgbaString);
}

function processClearScreenEvent(canvasWrapper: CanvasWrapper, event: ClearScreenEvent): void {
  const { color } = event;
  canvasWrapper.drawFilledRect(0, 0, canvasWrapper.width, canvasWrapper.height, color.rgbaString);
}

function processFloodFillEvent(canvasWrapper: CanvasWrapper, event: FloodFillEvent): void {
  const { color, startPoint } = event;

  // Initial pixel information for the entire canvas. Doing it this way because invoking
  // getImageData several times is expensive than just doing it once
  const canvasPixelData = canvasWrapper.getImageData(0, 0, canvasWrapper.width, canvasWrapper.height);

  // Color of the starting pixel
  const initialColor = getColorForPixel(canvasPixelData, startPoint.x, startPoint.y);
  const newColor = color.rgba;

  // In the pixel data, "alpha" needs to be between (0 and 255)
  newColor.a *= 255;

  // set of all the nodes that are already visited
  const visitedNodes: Record<number, Record<number, boolean>> = {};
  const pixelQueue = new Queue([startPoint.x, startPoint.y]);

  // Implementation of BFS algorithm for filling colors in
  // the region
  while (not(pixelQueue.isEmpty)) {
    const [x, y] = pixelQueue.popLeft()!;

    const rIndex = getRedColorIndicesForPixel(canvasPixelData.width, x, y);
    const gIndex = rIndex + 1;
    const bIndex = rIndex + 2;
    const aIndex = rIndex + 3;

    // if index out of bounds, return
    if (x < 0 || x >= canvasPixelData.width || y < 0 || y >= canvasPixelData.height) continue;

    // if color is not same as initial color, return
    if (not(areColorsEqual(getColorForPixel(canvasPixelData, x, y), initialColor))) continue;

    // if already visited, return
    if (visitedNodes[x]?.[y]) continue;

    // Add to visited nodes
    visitedNodes[x] ??= {};
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
  canvasWrapper.putImageData(canvasPixelData, 0, 0);
}

export function processAppEvent(canvasWrapper: CanvasWrapper, eventsQueue: Queue<AppEvent>): void {
  while (not(eventsQueue.isEmpty)) {
    const event = eventsQueue.popLeft();

    if (event.type === 'point') {
      processDrawPointEvent(canvasWrapper, event);
    } else if (event.type === 'line') {
      processDrawLineEvent(canvasWrapper, event);
    } else if (event.type === 'fill') {
      processFloodFillEvent(canvasWrapper, event);
    } else if (event.type === 'clear') {
      processClearScreenEvent(canvasWrapper, event);
    } else if (event.type === 'commit') {
      // no op
    }
  }
}
