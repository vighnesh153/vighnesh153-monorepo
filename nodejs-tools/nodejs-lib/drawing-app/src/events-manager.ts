import { Queue, Stack, not } from '@vighnesh153/tools-platform-independent';
import { buildClearScreenEvent, type AppEvent } from './events';
import { Color } from './colors';

export type EventsManager = {
  undoEventsStack: Stack<AppEvent>;
  redoEventsStack: Stack<AppEvent>;
  pendingQueue: Queue<AppEvent>; // events pending to be processed
};

function isCommitEvent(event?: AppEvent): boolean {
  return event?.type === 'commit';
}

export function buildEventsManager(): EventsManager {
  return {
    undoEventsStack: new Stack(),
    redoEventsStack: new Stack(),
    pendingQueue: new Queue(),
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

  // add events to pending queue
  eventsManager.pendingQueue = new Queue(
    buildClearScreenEvent({
      color: Color.White,
    }),
    ...eventsManager.undoEventsStack.toArray()
  );

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

    eventsManager.pendingQueue.pushRight(event);
  }

  return true;
}

export function publishEvents(eventsManager: EventsManager, events: AppEvent[]): void {
  eventsManager.undoEventsStack.push(...events);
  eventsManager.redoEventsStack = new Stack();

  eventsManager.pendingQueue.pushRight(...events);
}
