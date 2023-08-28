import { writable } from 'svelte/store';
import type { EventsManager } from '@vighnesh153/drawing-app';
import { Queue } from '@vighnesh153/utils';

export const eventsManagerStore = writable<EventsManager>({
  eventIndexPointer: null,
  events: [],
  eventProcessingQueue: new Queue(),
});
