import { derived, writable } from "svelte/store";
import {
  buildEventsManager,
  type EventsManager,
  isRedoAvailable,
  isUndoAvailable,
} from "@vighnesh153/drawing-app";
import { Queue } from "@vighnesh153/tools";

export const eventsManagerStore = writable<EventsManager>(buildEventsManager());

export const pendingQueueStore = derived(
  eventsManagerStore,
  (baseStore) => new Queue(...baseStore.pendingQueue.toArray()),
);
export const isUndoAvailableStore = derived(
  eventsManagerStore,
  (baseStore) => isUndoAvailable(baseStore),
);
export const isRedoAvailableStore = derived(
  eventsManagerStore,
  (baseStore) => isRedoAvailable(baseStore),
);
