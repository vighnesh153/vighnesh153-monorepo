import { Color, type IColor } from '@vighnesh153/drawing-app';
import { writable } from 'svelte/store';

export const colorStore = writable<IColor>(Color.Black);
