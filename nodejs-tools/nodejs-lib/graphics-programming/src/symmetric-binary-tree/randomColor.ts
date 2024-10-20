import { shuffleIterable } from '@vighnesh153/tools';

const colors = ['red', 'green', 'black', 'blue', 'yellow', 'orange', 'purple'];

export function randomColor(): string {
  return shuffleIterable(colors)[0];
}
