import { BrushThickness } from './AppConfig';
import { type IColor } from './colors';
import { createId } from './createId';

export type Point = {
  x: number;
  y: number;
};

type EventCommon = {
  eventId: string;
};

export type DrawPointEvent = EventCommon & {
  type: 'point';
  point: Point;
  color: IColor;
  brushThickness: BrushThickness;
};

export function buildDrawPointEvent(config: Omit<DrawPointEvent, 'type' | 'eventId'>): DrawPointEvent {
  return {
    type: 'point',
    eventId: createId(),
    ...config,
  };
}

export type FloodFillEvent = EventCommon & {
  type: 'fill';
  startPoint: Point; // where the flood fill should begin from
  color: IColor;
};

export function buildFloodFillEvent(config: Omit<FloodFillEvent, 'type' | 'eventId'>): FloodFillEvent {
  return {
    type: 'fill',
    eventId: createId(),
    ...config,
  };
}

// Draws the line between 2 points
export type DrawLineEvent = EventCommon & {
  type: 'line';
  startPoint: Point;
  endPoint: Point;
  color: IColor;
  brushThickness: BrushThickness;
};

export function buildDrawLineEvent(config: Omit<DrawLineEvent, 'type' | 'eventId'>): DrawLineEvent {
  return {
    type: 'line',
    eventId: createId(),
    ...config,
  };
}

export type ClearScreenEvent = EventCommon & {
  type: 'clear';
  color: IColor;
};

export function buildClearScreenEvent(config: Omit<ClearScreenEvent, 'type' | 'eventId'>): ClearScreenEvent {
  return {
    type: 'clear',
    eventId: createId(),
    ...config,
  };
}

// No-op event. This event will be used in the undo-redo stack
export type CommitEvent = EventCommon & {
  type: 'commit';
};

export function buildCommitEvent(): CommitEvent {
  return {
    type: 'commit',
    eventId: createId(),
  };
}

export type AppEvent = DrawPointEvent | FloodFillEvent | DrawLineEvent | ClearScreenEvent | CommitEvent;
