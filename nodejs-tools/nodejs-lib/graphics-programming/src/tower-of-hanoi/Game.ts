import { CanvasWrapper } from '@/canvas-wrapper';
import { RodConfig } from './Rod';
import { Disc } from './Disc';
import { RodManager } from './RodManager';
import { range } from '@vighnesh153/utils';

export interface TowerOfHanoiGameOptions {
  rodConfig?: RodConfig;

  discConfig?: {
    count?: number;

    color?: string;
    borderColor?: string;
    borderWidth?: number;
    thickness?: number;
  };
}

export class TowerOfHanoiGame {
  readonly #canvasWrapper: CanvasWrapper;

  static readonly rodCount = 3;

  readonly #discCount: number;
  readonly #discColor: string;
  readonly #discBorderWidth: number;
  readonly #discBorderColor: string;
  readonly #discThickness: number;

  readonly #discs: Disc[] = [];

  readonly #rodManager: RodManager;

  constructor(canvasWrapper: CanvasWrapper, options: TowerOfHanoiGameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;

    const rect = canvasWrapper.getBoundingClientRect();
    // const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    this.#discCount = options.discConfig?.count ?? 10;
    this.#discColor = options.discConfig?.color ?? 'red';
    this.#discBorderColor = options.discConfig?.borderColor ?? 'black';
    this.#discThickness = options.discConfig?.thickness ?? (canvasHeight * 3) / 100;
    this.#discBorderWidth = options.discConfig?.borderWidth ?? this.#discThickness / 5;

    this.#rodManager = new RodManager(canvasWrapper, TowerOfHanoiGame.rodCount, options.rodConfig ?? {});

    this.initializeDiscs();
  }

  *start() {
    this.draw();
    yield;
  }

  stop() {
    //
  }

  draw() {
    this.#rodManager.drawRods();
    this.drawDiscs();
  }

  private drawDiscs() {
    this.#discs.forEach((disc) => disc.draw());
  }

  private initializeDiscs() {
    const thickness = this.#discThickness;
    const basePosition = this.#rodManager.getBaseCenterPosition(0);
    if (basePosition === null) {
      throw new Error('Index out of bounds');
    }
    basePosition.y -= thickness / 2;

    for (const i of range(1, this.#discCount)) {
      this.#discs.push(
        new Disc(this.#canvasWrapper, {
          border: {
            color: this.#discBorderColor,
            width: this.#discBorderWidth,
          },
          center: {
            ...basePosition,
            y: basePosition.y - (this.#discCount - i) * thickness,
          },
          color: this.#discColor,
          thickness: thickness,
          width: (this.#rodManager.baseWidth * (9 * i)) / 100,
        })
      );
    }
  }
}
