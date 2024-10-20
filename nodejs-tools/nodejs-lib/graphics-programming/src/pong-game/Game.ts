import { CanvasWrapper } from "@/canvas-wrapper.ts";
import { getCanvasBgColor } from "@/getCanvasBgColor.ts";
import { ScoreTracker } from "./score-tracker.ts";
import { Arena } from "./Arena.ts";

interface GameOptions {
  bgColor?: string;
  contentColor?: string;
}

export class PongGame {
  readonly #canvasWrapper: CanvasWrapper;

  readonly #bgColor: string;
  readonly #contentColor: string;
  readonly #scoreTracker = new ScoreTracker();

  readonly #arena: Arena;

  #isRunning = false;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;
    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.#contentColor = options.contentColor ?? "black";

    this.#arena = new Arena(canvasWrapper, {
      scoreTracker: this.#scoreTracker,
      contentColor: this.#contentColor,
    });
  }

  *start() {
    this.#isRunning = true;
    while (this.#isRunning) {
      this.draw();
      this.update();
      yield;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  draw() {
    this.clear();
    this.drawArena();
  }

  update() {
    this.updateArena();
  }

  private drawArena() {
    this.#arena.draw();
  }

  private updateArena() {
    this.#arena.update();
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(
      0,
      0,
      canvasWidth,
      canvasHeight,
      this.#bgColor,
    );
  }

  handleMouseMove(e: MouseEvent, scrollTop: number) {
    this.#arena.handleMouseMove(e, scrollTop);
  }
}
