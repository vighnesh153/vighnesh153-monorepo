import type { CanvasWrapper } from "../canvas_wrapper.ts";
import { getCanvasBgColor } from "../get_canvas_bg_color.ts";
import { ScoreTracker } from "./score_tracker.ts";
import { InfoScreen } from "./info_screen.ts";
import type { Screen } from "./screen.ts";
import { GameplayScreen } from "./gameplay_screen.ts";

interface FlappyBlockGameOptions {
  readonly bgColor?: string;
  readonly defaultColor?: string;
  readonly verticalPadding?: number;
}

export class FlappyBlockGame {
  readonly canvasWrapper: CanvasWrapper;

  readonly verticalPadding: number;
  readonly bgColor: string;
  readonly defaultColor: string;

  readonly scoreTracker = new ScoreTracker();

  private infoScreen: InfoScreen;
  private gameplayScreen: GameplayScreen;

  activeScreen: Screen;
  isRunning = false;

  constructor(
    canvasWrapper: CanvasWrapper,
    options: FlappyBlockGameOptions = {},
  ) {
    this.canvasWrapper = canvasWrapper;

    this.bgColor = options.bgColor ?? getCanvasBgColor(canvasWrapper);
    this.verticalPadding = options.verticalPadding ?? 20;
    this.defaultColor = options.defaultColor ?? "black";

    this.infoScreen = this.newInfoScreen();
    this.gameplayScreen = this.newGamePlayScreen();

    // this.activeScreen = this.infoScreen;
    this.activeScreen = this.gameplayScreen;
  }

  *start() {
    this.isRunning = true;
    while (this.isRunning) {
      this.draw();
      this.update();
      yield;
    }
  }

  stop() {
    this.isRunning = false;
  }

  handleSpacebarPress() {
    this.activeScreen.handleSpacebarPress();
  }

  handleEnterPress() {
    this.activeScreen.handleEnterPress();
  }

  private draw() {
    this.clear();
    this.drawBorders();
    this.drawScreen();
  }

  private update() {
    this.activeScreen.update();
  }

  private drawScreen() {
    this.activeScreen.draw();
  }

  private drawBorders() {
    const cw = this.canvasWrapper;
    const color = this.defaultColor;
    const padding = this.verticalPadding;

    cw.drawLine(0, padding, cw.width, padding, 2, color);
    cw.drawLine(
      0,
      cw.height - padding,
      cw.width,
      cw.height - padding,
      2,
      color,
    );
  }

  private changeScreen() {
    if (this.activeScreen.type === "gameplay") {
      this.infoScreen = this.newInfoScreen();
      this.activeScreen = this.infoScreen;
    } else if (this.activeScreen.type === "info") {
      this.scoreTracker.reset();
      this.gameplayScreen = this.newGamePlayScreen();
      this.activeScreen = this.gameplayScreen;
    }
  }

  private newInfoScreen(): InfoScreen {
    return new InfoScreen(this.canvasWrapper, {
      scoreTracker: this.scoreTracker,
      changeScreen: () => this.changeScreen(),
    });
  }

  private newGamePlayScreen(): GameplayScreen {
    return new GameplayScreen(this.canvasWrapper, {
      scoreTracker: this.scoreTracker,
      verticalPadding: this.verticalPadding,
      changeScreen: () => this.changeScreen(),
    });
  }

  clear() {
    const rect = this.canvasWrapper.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    this.canvasWrapper.drawFilledRect(
      0,
      0,
      canvasWidth,
      canvasHeight,
      this.bgColor,
    );
  }
}
