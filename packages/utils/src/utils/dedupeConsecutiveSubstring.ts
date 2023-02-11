import { repeat } from './repeat';

/**
 * Merges consecutive dedupeString instances into 1
 *
 * @param s
 * @param dedupeString
 */
export function dedupeConsecutiveSubstring(s: string, dedupeString: string): string {
  const characters = s.split('');
  const resultCharacters = [] as string[];
  const wordLength = dedupeString.length;

  for (let i = 0; i < s.length; i++) {
    resultCharacters.push(characters[i]);
    if (i < dedupeString.length) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const lastWordStartIndex = i - wordLength + 1;
    const lastWordEndIndex = i + 1;
    const lastWord = s.slice(lastWordStartIndex, lastWordEndIndex);
    const wordBeforeLastWord = s.slice(lastWordStartIndex - wordLength, lastWordEndIndex - wordLength);
    if (lastWord === dedupeString && lastWord === wordBeforeLastWord) {
      repeat(wordLength, () => resultCharacters.pop());
    }
  }

  return resultCharacters.join('');
}
