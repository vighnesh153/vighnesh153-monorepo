export class CanvasHelper {
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
    this.canvas = canvas;

    // Set display size (css pixels)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set actual size in memory (scaled to account for extra pixel density)
    // Change to 1 on retina screens to see blurry canvas
    // const scale = window.devicePixelRatio;
    const scale = 1;
    canvas.width = width * scale;
    canvas.height = height * scale;

    const canvasContext = this.canvas.getContext('2d');
    if (canvasContext === null) {
      throw new Error('CanvasContext is null. Check why that is happening.');
    }

    // Disable image smoothing (shows wrong color during fill operation with putImageData)
    canvasContext.imageSmoothingEnabled = false;

    this.canvasContext = canvasContext;
    const dpr = window.devicePixelRatio;
    this.canvasContext.scale(dpr, dpr);
    this.reset();
  }

  reset = () => {
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  };

  getBoundingClientRect = () => {
    return this.canvas.getBoundingClientRect();
  };

  getImageData = (x: number, y: number, w: number, h: number, settings?: ImageDataSettings) => {
    return this.canvasContext.getImageData(x, y, w, h, settings);
  };

  putImageData = (imageData: ImageData, dx: number, dy: number) => {
    return this.canvasContext.putImageData(imageData, dx, dy);
  };

  drawFilledRect = (x: number, y: number, width: number, height: number, color: string) => {
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(x, y, width, height);
  };

  drawLine = (x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: string) => {
    this.canvasContext.save();
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = lineWidth;
    this.canvasContext.lineCap = 'round';
    this.canvasContext.strokeStyle = color;
    this.canvasContext.moveTo(x1, y1);
    this.canvasContext.lineTo(x2, y2);
    this.canvasContext.stroke();
    this.canvasContext.restore();
  };

  drawFilledCircle = (centerX: number, centerY: number, radius: number, color: string) => {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = color;
    this.canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    this.canvasContext.fill();
  };

  translate = (x: number, y: number) => {
    this.canvasContext.translate(x, y);
  };

  rotate = (angle: number) => {
    this.canvasContext.rotate(angle);
  };

  pushState = () => {
    this.canvasContext.save();
  };

  popState = () => {
    this.canvasContext.restore();
  };
}
