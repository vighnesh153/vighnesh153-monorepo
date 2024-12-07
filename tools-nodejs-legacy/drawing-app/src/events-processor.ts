import { not, Queue } from "@vighnesh153/tools";

import type {
  AppEvent,
  ClearScreenEvent,
  DrawLineEvent,
  DrawPointEvent,
  FloodFillEvent,
} from "./events.ts";
import { CanvasWrapper } from "./CanvasWrapper.ts";

const PACKED_POINT_MODULO = 10000;
const PACKED_COLOR_MODULO = 1000;
function packPoint(x: number, y: number): number {
  return x * PACKED_POINT_MODULO + y;
}

// returns the indices for the r,g,b,a components of the colors of the provided pixel coordinates
function getRedColorIndicesForPixel(
  canvasWidth: number,
  x: number,
  y: number,
): number {
  const pixelsOnSingleRow = canvasWidth * 4; // 1 for each (r,g,b,a)
  const rIndex = y * pixelsOnSingleRow + x * 4;
  return rIndex;
}

function getColorForPixel(
  canvasPixelData: ImageData,
  x: number,
  y: number,
): number {
  const rIndex = getRedColorIndicesForPixel(canvasPixelData.width, x, y);
  const gIndex = rIndex + 1;
  const bIndex = rIndex + 2;
  const aIndex = rIndex + 3;
  const r = canvasPixelData.data[rIndex];
  const g = canvasPixelData.data[gIndex];
  const b = canvasPixelData.data[bIndex];
  const a = canvasPixelData.data[aIndex];
  // pack colors
  return ((r * PACKED_COLOR_MODULO + g) * PACKED_COLOR_MODULO + b) *
      PACKED_COLOR_MODULO + a;
}

function areColorsEqual(packedColor1: number, packedColor2: number): boolean {
  return packedColor1 === packedColor2;
}

function processDrawPointEvent(
  canvasWrapper: CanvasWrapper,
  event: DrawPointEvent,
): void {
  const { color, brushThickness, point } = event;
  canvasWrapper.drawFilledCircle(
    point.x,
    point.y,
    brushThickness / 2,
    color.rgbaString,
  );
}

function processDrawLineEvent(
  canvasWrapper: CanvasWrapper,
  event: DrawLineEvent,
): void {
  const { color, brushThickness, startPoint, endPoint } = event;
  canvasWrapper.drawLine(
    startPoint.x,
    startPoint.y,
    endPoint.x,
    endPoint.y,
    brushThickness,
    color.rgbaString,
  );
}

function processClearScreenEvent(
  canvasWrapper: CanvasWrapper,
  event: ClearScreenEvent,
): void {
  const { color } = event;
  canvasWrapper.drawFilledRect(
    0,
    0,
    canvasWrapper.width,
    canvasWrapper.height,
    color.rgbaString,
  );
}

function processFloodFillEvent(
  canvasWrapper: CanvasWrapper,
  event: FloodFillEvent,
): void {
  const {
    color,
    startPoint: { x: startPointX, y: startPointY },
  } = event;
  const rounededStartPointX = Math.round(startPointX);
  const rounededStartPointY = Math.round(startPointY);

  // Initial pixel information for the entire canvas. Doing it this way because invoking
  // getImageData several times is expensive than just doing it once
  const canvasPixelData = canvasWrapper.getImageData(
    0,
    0,
    canvasWrapper.width,
    canvasWrapper.height,
  );

  // Color of the starting pixel
  const initialColor = getColorForPixel(
    canvasPixelData,
    rounededStartPointX,
    rounededStartPointY,
  );
  const newColor = color.rgba;

  // In the pixel data, "alpha" needs to be between (0 and 255)
  newColor.a *= 255;

  // set of all the nodes that are already visited
  const visitedNodes: Record<number, Record<number, boolean>> = {};
  const pixelQueue = new Queue(
    packPoint(rounededStartPointX, rounededStartPointY),
  );

  // Implementation of BFS algorithm for filling colors in
  // the region
  while (not(pixelQueue.isEmpty)) {
    const packedPoint = pixelQueue.popLeft()!;
    const y = packedPoint % PACKED_POINT_MODULO;
    const x = (packedPoint - y) / PACKED_POINT_MODULO;

    const rIndex = getRedColorIndicesForPixel(canvasPixelData.width, x, y);
    const gIndex = rIndex + 1;
    const bIndex = rIndex + 2;
    const aIndex = rIndex + 3;

    // if index out of bounds, return
    if (
      x < 0 || x >= canvasPixelData.width || y < 0 ||
      y >= canvasPixelData.height
    ) continue;

    // if color is not same as initial color, return
    if (
      not(areColorsEqual(getColorForPixel(canvasPixelData, x, y), initialColor))
    ) continue;

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
    pixelQueue.pushRight(
      packPoint(x + 1, y),
      packPoint(x - 1, y),
      packPoint(x, y + 1),
      packPoint(x, y - 1),
    );
  }

  // update the canvas with the new color values
  canvasWrapper.putImageData(canvasPixelData, 0, 0);
}

export function processAppEvent(
  canvasWrapper: CanvasWrapper,
  event: AppEvent,
): void {
  if (event.type === "point") {
    processDrawPointEvent(canvasWrapper, event);
  } else if (event.type === "line") {
    processDrawLineEvent(canvasWrapper, event);
  } else if (event.type === "fill") {
    processFloodFillEvent(canvasWrapper, event);
  } else if (event.type === "clear") {
    processClearScreenEvent(canvasWrapper, event);
  } else if (event.type === "commit") {
    // no op
  }
}
