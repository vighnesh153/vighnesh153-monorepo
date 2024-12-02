import { BrushThickness } from "@vighnesh153/drawing-app";
import { writable } from "svelte/store";

export const brushThicknessStore = writable<BrushThickness>(BrushThickness.sm);
