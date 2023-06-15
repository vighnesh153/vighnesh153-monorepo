import { shuffle } from '@vighnesh153/utils';

export function randomBgColor(): string {
  return shuffle([
    'yellow',
    'lightpink',
    'deepskyblue',
    'antiquewhite',
    'aquamarine',
    'chartreuse',
    'greenyellow',
    'lavenderblush',
    'mediumspringgreen',
    'salmon',
    'thistle',
  ])[0];
}
