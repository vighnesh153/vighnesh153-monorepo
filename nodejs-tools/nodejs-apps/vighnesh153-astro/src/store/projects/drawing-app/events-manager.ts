import { derived, writable } from 'svelte/store';
import { isUndoAvailable, type EventsManager, isRedoAvailable, buildEventsManager } from '@vighnesh153/drawing-app';

export const eventsManagerStore = writable<EventsManager>(buildEventsManager());

export const pendingQueueStore = derived(eventsManagerStore, (baseStore) => baseStore.pendingQueue);
export const isUndoAvailableStore = derived(eventsManagerStore, (baseStore) => isUndoAvailable(baseStore));
export const isRedoAvailableStore = derived(eventsManagerStore, (baseStore) => isRedoAvailable(baseStore));
