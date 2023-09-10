import { Point, buildCommitEvent, buildDrawLineEvent, buildFloodFillEvent } from './events';
import { publishEvents, type EventsManager } from './events-manager';
import { AppConfig } from './AppConfig';

export type MouseHandlerStore = {
  state: 'idle' | 'pressed' | 'drag';
  location: Point;
};

export function buildMouseHandlerStore(): MouseHandlerStore {
  return {
    state: 'idle',
    location: {
      x: 0,
      y: 0,
    },
  };
}

export function handleMouseDown(
  mouseHandlerStore: MouseHandlerStore,
  event: MouseEvent,
  canvasElement: HTMLCanvasElement
) {
  const boundingClientRect = canvasElement.getBoundingClientRect();
  const point: Point = {
    x: event.clientX - boundingClientRect.left,
    y: event.clientY - boundingClientRect.top,
  };
  mouseHandlerStore.state = 'pressed';
  mouseHandlerStore.location = point;
}

export function handleMouseMove(
  mouseHandlerStore: MouseHandlerStore,
  eventsManager: EventsManager,
  appConfig: AppConfig,
  event: MouseEvent,
  canvasElement: HTMLCanvasElement
) {
  const boundingClientRect = canvasElement.getBoundingClientRect();
  const newPoint: Point = {
    x: event.clientX - boundingClientRect.left,
    y: event.clientY - boundingClientRect.top,
  };

  if (mouseHandlerStore.state !== 'idle' && appConfig.mode !== 'fill') {
    const drawLineEvent = buildDrawLineEvent({
      color: appConfig.color,
      brushThickness: appConfig.brushThickness,
      startPoint: mouseHandlerStore.location,
      endPoint: newPoint,
    });
    publishEvents(eventsManager, [drawLineEvent]);

    mouseHandlerStore.state = 'drag';
  }

  mouseHandlerStore.location = newPoint;
}

export function handleMouseUp(
  mouseHandlerStore: MouseHandlerStore,
  eventsManager: EventsManager,
  appConfig: AppConfig,
  event: MouseEvent,
  canvasElement: HTMLCanvasElement
) {
  if (mouseHandlerStore.state === 'idle') return;

  const boundingClientRect = canvasElement.getBoundingClientRect();
  const newPoint: Point = {
    x: event.clientX - boundingClientRect.left,
    y: event.clientY - boundingClientRect.top,
  };
  const previousPoint = mouseHandlerStore.location;
  const previousState = mouseHandlerStore.state;
  mouseHandlerStore.state = 'idle';
  mouseHandlerStore.location = newPoint;

  if (appConfig.mode === 'draw') {
    if (previousState === 'drag' || previousState === 'pressed') {
      publishEvents(eventsManager, [
        buildDrawLineEvent({
          brushThickness: appConfig.brushThickness,
          color: appConfig.color,
          startPoint: previousPoint,
          endPoint: newPoint,
        }),
        buildCommitEvent(),
      ]);
    }
    return;
  }

  if (appConfig.mode === 'fill') {
    if (previousState === 'pressed') {
      publishEvents(eventsManager, [
        buildFloodFillEvent({
          color: appConfig.color,
          startPoint: newPoint,
        }),
        buildCommitEvent(),
      ]);
    }
    return;
  }

  throw new Error('We should never reach here.');
}
