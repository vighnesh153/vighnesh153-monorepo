import { not, range } from "@vighnesh153/tools";
import { getCanvasBgColor } from "../get_canvas_bg_color.ts";
import type { CanvasWrapper } from "../canvas_wrapper.ts";
import type { StackConfig } from "./stack.ts";
import { Disc, type DiscConfig } from "./disc.ts";
import { StacksManager } from "./stacks_manager.ts";
import { towerOfHanoi } from "./algorithm.ts";
import { animateDiscMovement } from "./animate_disc_movement.ts";

export interface TowerOfHanoiGameOptions {
  stackConfig?: StackConfig;

  discCount?: number;
  discConfig?: Omit<DiscConfig, "center" | "width">;

  ceilingGap?: number;
  animationSpeed?: number;

  bgColor?: string;
}

export class TowerOfHanoiGame {
  readonly #canvasWrapper: CanvasWrapper;

  static readonly maxDiscCount = 10;
  static readonly stackCount = 3;

  readonly #bgColor: string;
  readonly #ceilingGap: number;
  readonly #animationSpeed: number;

  readonly #discCount: number;
  readonly #discConfig: Omit<DiscConfig, "center" | "width">;

  readonly #stacksManager: StacksManager;

  #isRunning = false;

  get isRunning(): boolean {
    return this.#isRunning;
  }

  constructor(
    canvasWrapper: CanvasWrapper,
    options: TowerOfHanoiGameOptions = {},
  ) {
    this.#canvasWrapper = canvasWrapper;

    const rect = canvasWrapper.getBoundingClientRect();
    const canvasHeight = rect.height;

    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.#ceilingGap = options.ceilingGap ?? 50;
    this.#animationSpeed = options.animationSpeed ?? 5;

    this.#discCount = options.discCount ?? TowerOfHanoiGame.maxDiscCount;
    const discThickness = options.discConfig?.thickness ??
      (canvasHeight * 3) / 100;
    this.#discConfig = {
      thickness: discThickness,
      color: "red",
      ...options.discConfig,
      border: {
        color: "black",
        width: discThickness / 5,
        ...options.discConfig?.border,
      },
    };

    this.#stacksManager = new StacksManager(
      canvasWrapper,
      TowerOfHanoiGame.stackCount,
      options.stackConfig ?? {},
    );

    this.initializeDiscs(0);

    this.draw();
  }

  *start() {
    this.#isRunning = true;
    for (const frame of this.solve()) {
      yield frame;
      if (not(this.#isRunning)) {
        break;
      }
    }
  }

  stop() {
    this.#isRunning = false;
  }

  private *solve() {
    const moves = towerOfHanoi(this.#discCount, 0, 1, 2);

    for (const move of moves) {
      const src = this.#stacksManager.getStack(move.from);
      const dest = this.#stacksManager.getStack(move.to);

      const disc = src.removeDisc()!;

      yield* animateDiscMovement({
        disc,
        src,
        dest,
        ceilingGap: this.#ceilingGap,
        speed: this.#animationSpeed,
        beforeYield: () => {
          this.draw();
          disc.draw();
        },
      });

      dest.addDisc(disc);
      this.draw();
      yield;
    }
  }

  private draw() {
    this.clearScreen();
    this.#stacksManager.draw();
  }

  private clearScreen() {
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

  private initializeDiscs(stackIndex: number) {
    const stack = this.#stacksManager.getStack(stackIndex);

    for (const i of Array.from(range(1, this.#discCount)).toReversed()) {
      stack.addDisc(
        new Disc(this.#canvasWrapper, {
          ...this.#discConfig,
          width: this.#stacksManager.baseWidth *
            ((1 / (TowerOfHanoiGame.maxDiscCount + 1)) * i),
        }),
      );
    }
  }
}
