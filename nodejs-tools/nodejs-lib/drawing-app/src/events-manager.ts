import { Queue, not } from '@vighnesh153/utils';
import { type AppEvent } from './events';

export type EventsManager = {
  events: AppEvent[];
  eventProcessingQueue: Queue<AppEvent>; // list of event ids to be processed
  eventIndexPointer: number | null;
};

function isCommitEvent(event?: AppEvent): boolean {
  return event?.type === 'commit';
}

export function isUndoAvailable(eventsManager: EventsManager): boolean {
  if (eventsManager.eventIndexPointer === null) {
    return false;
  }
  return true;
}

export function isRedoAvailable(eventsManager: EventsManager): boolean {
  if (eventsManager.eventIndexPointer === null) {
    return eventsManager.events.length > 0;
  }

  // there is at least 1 event after the pointer
  return eventsManager.eventIndexPointer < eventsManager.events.length - 1;
}

// returns true, if undo was successful, else, false
export function undo(eventsManager: EventsManager): boolean {
  if (not(isUndoAvailable(eventsManager))) false;

  // Move pointer to previous commit:
  //
  // [ {...}, {...}, {...}, {type=commit}, {...}, {...}, {type=commit}]
  //                                                           ^
  //
  // will become
  //
  // [ {...}, {...}, {...}, {type=commit}, {...}, {...}, {type=commit} ]
  //                              ^
  let pointer = eventsManager.eventIndexPointer!;
  let event = eventsManager.events[pointer];
  do {
    pointer -= 1;
    event = eventsManager.events[pointer];
  } while (pointer >= 0 && not(isCommitEvent(event)));

  if (pointer < 0) {
    eventsManager.eventIndexPointer = null;
    eventsManager.eventProcessingQueue = new Queue();
  } else {
    eventsManager.eventIndexPointer = pointer;
    eventsManager.eventProcessingQueue = new Queue(...eventsManager.events.slice(0, pointer));
  }

  return true;
}

// returns true, if redo was successful, else, false
export function redo(eventsManager: EventsManager): boolean {
  if (not(isRedoAvailable(eventsManager))) false;

  // Move pointer to next commit:
  //
  // [ {...}, {...}, {...}, {type=commit}, {...}, {...}, {type=commit}]
  //                              ^
  //
  // will become
  //
  // [ {...}, {...}, {...}, {type=commit}, {...}, {...}, {type=commit} ]
  //                                                           ^
  //
  let pointer = eventsManager.eventIndexPointer ?? -1;
  let event = eventsManager.events[pointer];
  do {
    pointer += 1;
    event = eventsManager.events[pointer];
  } while (pointer < eventsManager.events.length - 1 && not(isCommitEvent(event)));

  eventsManager.events = eventsManager.events.slice(eventsManager.eventIndexPointer ?? 0, pointer);
  eventsManager.eventIndexPointer = pointer;

  return true;
}

export function publishEvents(eventsManager: EventsManager, events: AppEvent[]): void {
  // remove all events from current index position (which will clear the redo stack)
  eventsManager.events.splice(eventsManager.eventIndexPointer ?? 0, eventsManager.events.length, ...events);

  // push all event ids to eventProcessingQueue
  eventsManager.eventProcessingQueue.pushRight(...events);

  // update the pointer to the last index
  eventsManager.eventIndexPointer = eventsManager.events.length - 1;
}
