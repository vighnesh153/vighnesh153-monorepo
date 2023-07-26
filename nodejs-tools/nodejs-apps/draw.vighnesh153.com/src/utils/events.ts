import { Color } from './colors';

export enum EventMode {
  Draw = 'Draw',
  Fill = 'Fill',
}

export type Coordinates = {
  x: number;
  y: number;
};

export enum BrushThickness {
  xs = 5,
  sm = 10,
  md = 15,
  lg = 20,
  xl = 25,
}

export type DrawPointEvent = {
  type: 'point';
  coordinates: Coordinates;
  color: Color;
  brushThickness: BrushThickness;
};

export type FillEvent = {
  type: 'fill';
  coordinates: Coordinates; // Where the fill should begin
  color: Color;
};

// Draws the line between 2 points
export type DrawLineEvent = {
  type: 'line';
  coordinate1: Coordinates;
  coordinate2: Coordinates;
  color: Color;
  brushThickness: BrushThickness;
};

export type ClearScreenEvent = {
  type: 'clear';
  color: Color;
};

export type DrawEvents = DrawPointEvent | FillEvent | DrawLineEvent | ClearScreenEvent;
