import { not } from '@vighnesh153/tools-platform-independent';
import { CanvasWrapper } from '@/canvas-wrapper';
import { getCanvasBgColor } from '@/getCanvasBgColor';
import { buildInitialLineHeightPercentsArray } from './buildInitialLineHeightPercentsArray';
import { SortingAlgorithm } from './SortingAlgorithm';

interface GameOptions {
  gap?: number;
  bgColor?: string;
  lineWidth?: number;
  lineColor?: string;
  modifiedIndexLineColor?: string;
  linesCount?: number;
}

export class SortingVisualizerGame {
  readonly #canvasWrapper: CanvasWrapper;
  readonly #gap: number;
  readonly #lineWidth: number;
  readonly #lineColor: string;
  readonly #modifiedIndexLineColor: string;
  readonly #bgColor: string;

  #lineHeightPercents: number[];

  #isRunning = false;

  constructor(canvasWrapper: CanvasWrapper, options: GameOptions = {}) {
    this.#canvasWrapper = canvasWrapper;

    this.#bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);

    this.#gap = options.gap ?? 20;
    this.#lineWidth = options.lineWidth ?? 2;
    this.#lineColor = options.lineColor ?? 'black';
    this.#modifiedIndexLineColor = options.modifiedIndexLineColor ?? 'red';

    const linesCount = options.linesCount ?? 200;
    this.#lineHeightPercents = buildInitialLineHeightPercentsArray(linesCount);
  }

  *start(sortingAlgorithm: SortingAlgorithm) {
    this.#isRunning = true;
    sortingAlgorithm.initializeArray(this.#lineHeightPercents);

    for (const frame of sortingAlgorithm.sort()) {
      if (not(this.#isRunning)) {
        break;
      }
      this.#lineHeightPercents = sortingAlgorithm.intermediateArrayState;
      this.clear();
      this.drawLines(sortingAlgorithm.intermediateModifiedIndicesState);
      yield frame;
    }
  }

  stop() {
    this.#isRunning = false;
  }

  clear() {
    const rect = this.#canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.#canvasWrapper.drawFilledRect(0, 0, canvasWidth, canvasHeight, this.#bgColor);
  }

  private drawLines(modifiedIndices: number[]): void {
    const canvasHeight = this.#canvasWrapper.height;
    const canvasWidth = this.#canvasWrapper.width;
    const gap = this.#gap;
    const lineWidth = this.#lineWidth;
    const availableHeight = canvasHeight - gap * 2;
    const availableWidth = canvasWidth - gap * 2;
    const widthPerLine = availableWidth / this.#lineHeightPercents.length;
    const defaultLineColor = this.#lineColor;
    const modifiedIndexLineColor = this.#modifiedIndexLineColor;

    this.#lineHeightPercents.forEach((lineHeightPercent, index) => {
      const x = gap + index * widthPerLine;
      const bottomY = canvasHeight - gap;
      const topY = bottomY - (availableHeight * lineHeightPercent) / 100;

      const lineColor = modifiedIndices.includes(index) ? modifiedIndexLineColor : defaultLineColor;

      this.#canvasWrapper.drawLine(x, bottomY, x, topY, lineWidth, lineColor);
    });
  }
}
