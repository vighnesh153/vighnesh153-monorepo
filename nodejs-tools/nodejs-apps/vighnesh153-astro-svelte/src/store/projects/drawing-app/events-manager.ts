import { derived, writable } from 'svelte/store';
import { isUndoAvailable, type EventsManager, isRedoAvailable } from '@vighnesh153/drawing-app';
import { Queue } from '@vighnesh153/utils';

export const eventsManagerStore = writable<EventsManager>({
  eventIndexPointer: null,
  events: [],
  eventProcessingQueue: new Queue(),
});

export const eventProcessingQueueStore = derived(eventsManagerStore, (baseStore) => baseStore.eventProcessingQueue);
export const isUndoAvailableStore = derived(eventsManagerStore, (baseStore) => isUndoAvailable(baseStore));
export const isRedoAvailableStore = derived(eventsManagerStore, (baseStore) => isRedoAvailable(baseStore));
