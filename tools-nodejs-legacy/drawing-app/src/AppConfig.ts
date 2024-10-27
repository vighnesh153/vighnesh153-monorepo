import { IColor } from "./colors.ts";

export type EventMode = "draw" | "fill";

export enum BrushThickness {
  xs = 5,
  sm = 10,
  md = 15,
  lg = 20,
  xl = 25,
}

export type AppConfig =
  | {
    mode: "draw";
    brushThickness: BrushThickness;
    color: IColor;
  }
  | {
    mode: "fill";
    color: IColor;
  };
