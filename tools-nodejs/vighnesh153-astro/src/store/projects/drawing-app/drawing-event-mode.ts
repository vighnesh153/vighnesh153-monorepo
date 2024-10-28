import { writable } from "svelte/store";
import { type EventMode } from "@vighnesh153/drawing-app";

export const drawingEventModeStore = writable<EventMode>("draw");
