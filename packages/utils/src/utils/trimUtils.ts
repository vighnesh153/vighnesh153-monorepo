import { groupStringCharacters } from './groupIterableItems';
import { reverseString } from './reverseString';

const defaultTrimString = ' ';

/**
 * Trims the beginning of the string
 *
 * @param s
 * @param trimString
 */
export function trimStart(s: string, trimString = defaultTrimString): string {
  if (trimString.length === 0) {
    return s;
  }

  const partsOfS = groupStringCharacters(s, trimString.length).reverse();
  while (partsOfS.at(-1) === trimString) {
    partsOfS.pop();
  }
  return partsOfS.reverse().join('');
}

/**
 * Trims the end of the string
 *
 * @param s
 * @param trimString
 */
export function trimEnd(s: string, trimString = defaultTrimString): string {
  if (trimString.length === 0) {
    return s;
  }

  return reverseString(trimStart(reverseString(s), reverseString(trimString)));
}

/**
 * Trims both the beginning and the end of the string
 *
 * @param s
 * @param trimString
 */
export function trim(s: string, trimString = defaultTrimString): string {
  return trimEnd(trimStart(s, trimString), trimString);
}
