import { CanvasWrapper } from './canvas-wrapper';

export function getCanvasBgColor(canvasWrapper: CanvasWrapper, fallbackColor = 'white'): string {
  return canvasWrapper.canvasElement.computedStyleMap().get('background-color')?.toString() ?? fallbackColor;
}
