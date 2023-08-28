import { BrushThickness, type AppConfig, Color } from '@vighnesh153/drawing-app';
import { writable } from 'svelte/store';

const drawingConfig = {
  brushThickness: BrushThickness.sm,
  color: Color.Black,
  mode: 'draw',
} as const;

export const drawingAppConfigStore = writable<AppConfig>(drawingConfig);
