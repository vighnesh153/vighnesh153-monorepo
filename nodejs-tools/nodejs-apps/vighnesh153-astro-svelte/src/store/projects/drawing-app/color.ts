import { type AppConfig, type IColor } from '@vighnesh153/drawing-app';
import { derived, type Writable } from 'svelte/store';
import { drawingAppConfigStore } from './app-config';

export const colorStore = derived<Writable<AppConfig>, IColor>(drawingAppConfigStore, (appConfig) => appConfig.color);
