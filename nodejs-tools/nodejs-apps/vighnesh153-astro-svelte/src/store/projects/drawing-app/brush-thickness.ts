import { BrushThickness, type AppConfig } from '@vighnesh153/drawing-app';
import { derived, type Writable } from 'svelte/store';
import { drawingAppConfigStore } from './app-config';

export const brushThicknessStore = derived<Writable<AppConfig>, BrushThickness>(
  drawingAppConfigStore,
  (appConfig, setter, updater) => {
    if (appConfig.mode === 'draw') {
      setter(appConfig.brushThickness);
    } else {
      updater((old) => old);
    }
  }
);
