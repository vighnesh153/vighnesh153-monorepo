import { dpr } from './dpr.ts';

export interface CanvasWrapper {
  readonly width: number;
  readonly height: number;
  readonly rect: DOMRect;
  readonly rectWidth: number;
  readonly rectHeight: number;
  readonly canvasElement: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;

  reset(): void;
  getBoundingClientRect(fresh?: boolean): DOMRect;
  getImageData(x: number, y: number, w: number, h: number, settings?: ImageDataSettings): ImageData;
  putImageData(imageData: ImageData, dx: number, dy: number): void;
  drawFilledRect(x: number, y: number, width: number, height: number, color: string): void;
  drawOutlinedRect(x: number, y: number, width: number, height: number, thickness: number, color: string): void;
  drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: string): void;
  drawFilledCircle(centerX: number, centerY: number, radius: number, color: string): void;
  writeText(text: string, x: number, y: number, color: string, fontSize: number): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  scale(x: number, y: number): void;
  pushState(): void;
  popState(): void;
}
export class CanvasWrapperImpl implements CanvasWrapper {
  readonly #canvas: HTMLCanvasElement;
  #canvasContext: CanvasRenderingContext2D;

  #boundingClientRect: DOMRect;

  get width(): number {
    return this.#canvas.width / dpr();
  }

  get height(): number {
    return this.#canvas.height / dpr();
  }

  get rect() {
    return this.getBoundingClientRect();
  }

  get rectWidth(): number {
    return this.getBoundingClientRect().width;
  }

  get rectHeight(): number {
    return this.getBoundingClientRect().height;
  }

  get canvasElement(): HTMLCanvasElement {
    return this.#canvas;
  }

  get context(): CanvasRenderingContext2D {
    return this.#canvasContext;
  }

  constructor(canvas: HTMLCanvasElement) {
    const canvasContext = canvas.getContext('2d', {
      willReadFrequently: true,
      desynchronized: true,
    });
    if (canvasContext === null) {
      throw new Error(`canvasContext shoudn't be null`);
    }

    // Disable image smoothing (shows wrong color during fill operation with putImageData)
    canvasContext.imageSmoothingEnabled = false;

    this.#canvas = canvas;
    this.#canvasContext = canvasContext;
    this.reset();

    // normalize
    const { width, height } = canvas.getBoundingClientRect();
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr();
    canvas.height = height * dpr();
    canvasContext.scale(dpr(), dpr());

    this.#boundingClientRect = canvas.getBoundingClientRect();
  }

  reset(): void {
    this.#canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  }

  getBoundingClientRect(fresh?: boolean): DOMRect {
    if (fresh) {
      this.#boundingClientRect = this.#canvas.getBoundingClientRect();
    }
    return this.#boundingClientRect;
  }

  getImageData(x: number, y: number, w: number, h: number, settings?: ImageDataSettings): ImageData {
    return this.#canvasContext.getImageData(x, y, w, h, settings);
  }

  putImageData(imageData: ImageData, dx: number, dy: number): void {
    this.#canvasContext.putImageData(imageData, dx, dy);
  }

  drawFilledRect(x: number, y: number, width: number, height: number, color: string): void {
    this.#canvasContext.fillStyle = color;
    this.#canvasContext.fillRect(x, y, width, height);
  }

  drawOutlinedRect(x: number, y: number, width: number, height: number, thickness: number, color: string): void {
    this.#canvasContext.strokeStyle = color;
    this.#canvasContext.lineWidth = thickness;
    this.#canvasContext.strokeRect(x, y, width, height);
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: string): void {
    this.#canvasContext.save();
    this.#canvasContext.beginPath();
    this.#canvasContext.lineWidth = lineWidth;
    this.#canvasContext.lineCap = 'round';
    this.#canvasContext.strokeStyle = color;
    this.#canvasContext.moveTo(x1, y1);
    this.#canvasContext.lineTo(x2, y2);
    this.#canvasContext.stroke();
    this.#canvasContext.restore();
  }

  drawFilledCircle(centerX: number, centerY: number, radius: number, color: string): void {
    this.#canvasContext.beginPath();
    this.#canvasContext.fillStyle = color;
    this.#canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    this.#canvasContext.fill();
  }

  writeText(text: string, x: number, y: number, color: string, fontSize: number) {
    this.#canvasContext.fillStyle = color;
    // set the font
    {
      const span = document.createElement('span');
      span.style.font = this.#canvasContext.font;
      span.style.fontSize = `${fontSize}px`;
      this.#canvasContext.font = span.style.font;
    }
    this.#canvasContext.fillText(text, x, y);
  }

  translate(x: number, y: number): void {
    this.#canvasContext.translate(x, y);
  }

  rotate(angle: number): void {
    this.#canvasContext.rotate(angle);
  }

  scale(x: number, y: number): void {
    this.#canvasContext.scale(x, y);
  }

  pushState(): void {
    this.#canvasContext.save();
  }

  popState(): void {
    this.#canvasContext.restore();
  }
}
