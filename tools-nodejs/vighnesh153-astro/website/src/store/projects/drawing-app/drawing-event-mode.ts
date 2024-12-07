import { atom } from "nanostores";
import { type EventMode } from "@vighnesh153/drawing-app";

export const drawingEventModeStore = atom<EventMode>("draw");
