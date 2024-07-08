import { shuffle } from '@vighnesh153/tools-platform-independent';

const colors = ['red', 'green', 'black', 'blue', 'yellow', 'orange', 'purple'];

export function randomColor(): string {
  return shuffle(colors)[0];
}
