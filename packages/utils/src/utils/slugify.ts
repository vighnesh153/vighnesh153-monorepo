import { not } from './not';
import characterMap from '../data/character-map.json';
import { dedupeConsecutiveSubstring } from './dedupeConsecutiveSubstring';
import { trim as trimString } from './trimUtils';

const STRICT_REGEXP = /[a-zA-Z0-9_]/;
const DEFAULT_SLUG_SAFE_CHARACTERS = /[a-zA-Z0-9\-._:@+()"'*~!]/;
const characterMapKeys = new Set(Object.keys(characterMap));

export interface SlugifyOptions {
  /**
   * Custom allowed characters
   */
  allowedCharacters?: RegExp;

  /**
   * Converts the slug to lower case
   *
   * @default true
   */
  convertToLowerCase?: boolean;

  /**
   * Replacement for characters that don't have a pre-defined replacement
   *
   * @default - (Hyphen)
   */
  fallbackReplacement?: string;

  /**
   * Removes the characters that match the regex
   */
  remove?: RegExp;

  /**
   * More customized replacement.
   *
   * @example
   * slugify('aabbcc~~~', {
   *   replacementMap: {
   *     a: '_A_',
   *     b: '_B_'
   *   }
   * })
   * // _A__A__B__B_cc___
   */
  replacementMap?: Record<string, string>;

  /**
   * Characters which are safe to be used in a slug
   *
   * @default /[a-zA-Z0-9\-._~*+()'"!:@]/
   */
  slugSafeCharacters?: RegExp;

  /**
   * Remove all the special characters except replacement character
   *
   * @default false
   */
  strict?: boolean;

  /**
   * Trims the replacement from start or end
   *
   * @default true
   */
  trim?: boolean;
}

/**
 * Slugifies the provided string
 *
 * @param value string to be slugified
 * @param options
 */
export function slugify(value: string, options: SlugifyOptions = {}): string {
  const {
    allowedCharacters = /^$/,
    convertToLowerCase = true,
    fallbackReplacement = '-',
    remove = /^$/,
    replacementMap = {},
    slugSafeCharacters = DEFAULT_SLUG_SAFE_CHARACTERS,
    strict = false,
    trim = true,
  } = options;

  if (typeof value !== 'string') {
    throw new Error(`Expected type string, found "${typeof value}"`);
  }

  const replacementMapKeys = new Set(Object.keys(replacementMap));
  const getReplacementCharacterFor = (originalCharacter: string): string => {
    // If user has provided replacement for the character, use it
    if (replacementMapKeys.has(originalCharacter)) {
      return replacementMap[originalCharacter];
    }
    // If our character map has a replacement for the character, use it
    if (characterMapKeys.has(originalCharacter)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return slugify((characterMap as any)[originalCharacter], options);
    }
    // If it is an acceptable character, don't transform
    if (originalCharacter.match(slugSafeCharacters) || originalCharacter.match(allowedCharacters)) {
      return originalCharacter;
    }
    return fallbackReplacement;
  };

  const rawCharacters = value.split('');
  const slugCharacters = [] as string[];

  rawCharacters.forEach((rawCharacter) => {
    let character = rawCharacter;

    // Handle strict
    if (strict && not(character.match(STRICT_REGEXP)) && character !== fallbackReplacement) {
      return;
    }

    // Character should be removed, if requested by the user
    if (character.match(remove)) {
      return;
    }

    // Convert to lower case if user needs it
    if (convertToLowerCase) {
      character = character.toLowerCase();
    }

    character = getReplacementCharacterFor(character);
    slugCharacters.push(character);
  }, [] as string[]);

  let result = slugCharacters.join('');

  // Dedupe is needed to merge consecutive fallbackReplacement into 1
  result = dedupeConsecutiveSubstring(result, fallbackReplacement);

  // Handle trim
  if (trim) {
    result = trimString(result, fallbackReplacement);
  }

  return result;
}
