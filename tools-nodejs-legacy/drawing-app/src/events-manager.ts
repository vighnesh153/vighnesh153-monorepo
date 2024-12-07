import { not, Stack } from "@vighnesh153/tools";
import { type AppEvent, buildClearScreenEvent } from "./events.ts";
import { Color } from "./colors.ts";
import { processAppEvent } from "./events-processor.ts";
import { CanvasWrapper } from "./CanvasWrapper.ts";

export type EventsManager = {
  undoEventsStack: Stack<AppEvent>;
  redoEventsStack: Stack<AppEvent>;
  onAppEvent: (event: AppEvent) => void;
};

function isCommitEvent(event?: AppEvent): boolean {
  return event?.type === "commit";
}

export function buildEventsManager(
  canvasWrapper: CanvasWrapper,
): EventsManager {
  return {
    undoEventsStack: new Stack(),
    redoEventsStack: new Stack(),
    onAppEvent: (event) => processAppEvent(canvasWrapper, event),
  };
}

export function isUndoAvailable(eventsManager: EventsManager): boolean {
  return eventsManager.undoEventsStack.size > 0;
}

export function isRedoAvailable(eventsManager: EventsManager): boolean {
  return eventsManager.redoEventsStack.size > 0;
}

// returns true, if undo was successful, else, false
export function undo(eventsManager: EventsManager): boolean {
  if (not(isUndoAvailable(eventsManager))) false;

  let isFirstCommitEvent = true;

  while (eventsManager.undoEventsStack.size > 0) {
    const event = eventsManager.undoEventsStack.pop();

    // non-first commit event
    if (isCommitEvent(event) && not(isFirstCommitEvent)) {
      eventsManager.undoEventsStack.push(event);
      break;
    }

    // first commit event
    if (isCommitEvent(event)) {
      isFirstCommitEvent = false;
    }

    eventsManager.redoEventsStack.push(event);
  }

  // Process events
  const events = [
    buildClearScreenEvent({
      color: Color.White,
    }),
    ...eventsManager.undoEventsStack.toArray(),
  ];
  for (const event of events) {
    eventsManager.onAppEvent(event);
  }

  return true;
}

// returns true, if redo was successful, else, false
export function redo(eventsManager: EventsManager): boolean {
  if (not(isRedoAvailable(eventsManager))) false;

  while (eventsManager.redoEventsStack.size > 0) {
    const event = eventsManager.redoEventsStack.pop();
    eventsManager.undoEventsStack.push(event);

    if (isCommitEvent(event)) {
      break;
    }

    // Process event
    eventsManager.onAppEvent(event);
  }

  return true;
}

export function publishEvents(
  eventsManager: EventsManager,
  events: AppEvent[],
): void {
  eventsManager.undoEventsStack.push(...events);
  eventsManager.redoEventsStack = new Stack();

  // Process event
  for (const event of events) {
    eventsManager.onAppEvent(event);
  }
}
