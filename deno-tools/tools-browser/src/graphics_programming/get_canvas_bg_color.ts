import type { CanvasWrapper } from "./canvas_wrapper.ts";

export function getCanvasBgColor(
  canvasWrapper: CanvasWrapper,
  fallbackColor = "white",
): string {
  return canvasWrapper.canvasElement.computedStyleMap().get("background-color")
    ?.toString() ?? fallbackColor;
}
