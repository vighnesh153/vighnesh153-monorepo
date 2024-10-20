import { not } from '@vighnesh153/tools';
import { CommonTypes } from './commonTypes.ts';

export interface ParseCodeStringsOptions extends Pick<CommonTypes, 'escapeCharacters'> {
  acceptableStringChars: string[];
}

type ParseCodeStringsResult = Array<{
  isString: boolean;
  value: string;
}>;

export function parseCodeStrings(code: string, options: ParseCodeStringsOptions): ParseCodeStringsResult {
  const { acceptableStringChars, escapeCharacters } = options;

  const stringIndices: { start: number; end: number }[] = [];
  let codeStringStartChar: string | null = null;
  let codeStringStartIndex: number | null = null;

  for (let currIndex = 0; currIndex < code.length; currIndex++) {
    const prevCh = currIndex > 0 ? code[currIndex - 1] : '';
    const ch = code[currIndex];

    const isAcceptableBeginStringChar = acceptableStringChars.includes(ch);
    const isEscaped = escapeCharacters.includes(prevCh);

    if (not(isAcceptableBeginStringChar && not(isEscaped))) continue;

    // start of string
    if (codeStringStartChar === null) {
      codeStringStartChar = ch;
      codeStringStartIndex = currIndex;
      continue;
    }

    // different string chars. eg: ', ", or `
    if (ch !== codeStringStartChar) {
      continue;
    }

    stringIndices.push({
      start: codeStringStartIndex as number,
      end: currIndex,
    });

    codeStringStartChar = null;
    codeStringStartIndex = null;
  }

  if (codeStringStartChar !== null) {
    stringIndices.push({
      start: codeStringStartIndex as number,
      end: code.length - 1,
    });
  }

  // no strings in code
  if (stringIndices.length === 0) {
    return [
      {
        isString: false,
        value: code,
      },
    ];
  }

  // could be optimized
  let codeIndex = 0;
  return stringIndices
    .reduce((prev, current, currentIndex) => {
      prev.push({
        isString: false,
        value: code.slice(codeIndex, current.start),
      });
      prev.push({
        isString: true,
        value: code.slice(current.start, current.end + 1),
      });
      codeIndex = current.end + 1;

      // last pair
      if (currentIndex === stringIndices.length - 1) {
        // some code is left after last string
        if (current.end < code.length - 1) {
          prev.push({
            isString: false,
            value: code.slice(current.end + 1, code.length),
          });
        }
      }
      return prev;
    }, [] as ParseCodeStringsResult)
    .filter(({ value }) => value.length > 0);
}
