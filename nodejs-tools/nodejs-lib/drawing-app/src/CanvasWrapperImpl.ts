import { CanvasWrapper } from './CanvasWrapper.ts';

export class CanvasWrapperImpl implements CanvasWrapper {
  private readonly canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }

  constructor(
    canvas: HTMLCanvasElement,
    { width = window.innerWidth, height = window.innerHeight }: { width?: number; height?: number } = {}
  ) {
    // Set display size (css pixels)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set actual size in memory (scaled to account for extra pixel density)
    // Change to 1 on retina screens to see blurry canvas
    // const scale = window.devicePixelRatio;
    const scale = 1;
    canvas.width = width * scale;
    canvas.height = height * scale;

    const canvasContext = canvas.getContext('2d', {
      willReadFrequently: true,
      desynchronized: true,
    });
    if (canvasContext === null) {
      throw new Error(`canvasContext shoudn't be null`);
    }

    // Disable image smoothing (shows wrong color during fill operation with putImageData)
    canvasContext.imageSmoothingEnabled = false;

    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.reset();
  }

  reset(): void {
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  }

  getBoundingClientRect(): DOMRect {
    return this.canvas.getBoundingClientRect();
  }

  getImageData(x: number, y: number, w: number, h: number, settings?: ImageDataSettings): ImageData {
    return this.canvasContext.getImageData(x, y, w, h, settings);
  }

  putImageData(imageData: ImageData, dx: number, dy: number): void {
    this.canvasContext.putImageData(imageData, dx, dy);
  }

  drawFilledRect(x: number, y: number, width: number, height: number, color: string): void {
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(x, y, width, height);
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: string): void {
    this.canvasContext.save();
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = lineWidth;
    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = color;
    this.canvasContext.moveTo(x1, y1);
    this.canvasContext.lineTo(x2, y2);
    this.canvasContext.stroke();
    this.canvasContext.restore();
  }

  drawFilledCircle(centerX: number, centerY: number, radius: number, color: string): void {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = color;
    this.canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    this.canvasContext.fill();
  }

  translate(x: number, y: number): void {
    this.canvasContext.translate(x, y);
  }

  rotate(angle: number): void {
    this.canvasContext.rotate(angle);
  }

  pushState(): void {
    this.canvasContext.save();
  }

  popState(): void {
    this.canvasContext.restore();
  }
}
