export interface CanvasWrapper {
  readonly width: number;
  readonly height: number;

  reset(): void;
  getBoundingClientRect(): DOMRect;
  getImageData(x: number, y: number, w: number, h: number, settings?: ImageDataSettings): ImageData;
  putImageData(imageData: ImageData, dx: number, dy: number): void;
  drawFilledRect(x: number, y: number, width: number, height: number, color: string): void;
  drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: string): void;
  drawFilledCircle(centerX: number, centerY: number, radius: number, color: string): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  pushState(): void;
  popState(): void;
}
