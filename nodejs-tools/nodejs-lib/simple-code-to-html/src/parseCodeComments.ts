import { not } from '@vighnesh153/utils';
import { CommonTypes } from './commonTypes';

export interface ParseCodeCommentsOptions extends Pick<CommonTypes, 'escapeCharacters'> {
  singleLineCommentIdentifiers: string[];
  multiLineCommentIdentifierPairs: Map<string, string>;
}

type ParseCodeCommentsResult = Array<{
  isComment: boolean;
  value: string;
}>;

function tryParseSingleLineCommentStart({
  code,
  singleLineCommentIdentifiers,
}: {
  code: string;
  singleLineCommentIdentifiers: string[];
}): string | null {
  return singleLineCommentIdentifiers.find((startId) => code.startsWith(startId)) ?? null;
}

function tryParseMultilineLineCommentStart({
  code,
  multiLineCommentStartIdentifiers,
}: {
  code: string;
  multiLineCommentStartIdentifiers: string[];
}): string | null {
  return multiLineCommentStartIdentifiers.find((startId) => code.startsWith(startId)) ?? null;
}

export function parseCodeComments(code: string, options: ParseCodeCommentsOptions): ParseCodeCommentsResult {
  const { singleLineCommentIdentifiers, multiLineCommentIdentifierPairs, escapeCharacters } = options;

  const commentIndices: { start: number; end: number }[] = [];
  let singleLineCommentStartIndex: number | null = null;
  let multilineCommentStartString: string | null = null;
  let multiLineCommentStartIndex: number | null = null;

  let currIndex = 0;
  while (currIndex < code.length) {
    const prevCh = currIndex > 0 ? code[currIndex - 1] : '';
    const isEscaped = escapeCharacters.includes(prevCh);

    // check if inside single line comment
    if (singleLineCommentStartIndex !== null) {
      const currChar = code[currIndex];

      // still on same line
      if (currChar !== `\n`) {
        currIndex += 1;
        continue;
      }

      commentIndices.push({
        start: singleLineCommentStartIndex,
        end: currIndex,
      });
      singleLineCommentStartIndex = null;
      currIndex += 1;
      continue;
    }

    // check if inside multiline comment
    if (multiLineCommentStartIndex !== null) {
      if (multilineCommentStartString === null) {
        throw new Error('This should not happen');
      }
      const expectedCommentEndString = multiLineCommentIdentifierPairs.get(multilineCommentStartString)!;

      // multiline comment ending
      if (code.slice(currIndex).startsWith(expectedCommentEndString)) {
        commentIndices.push({
          start: multiLineCommentStartIndex,
          end: currIndex + expectedCommentEndString.length - 1,
        });
        multiLineCommentStartIndex = null;
        currIndex = currIndex + expectedCommentEndString.length;
        continue;
      }

      // multiline comment not ended yet
      currIndex += 1;
      continue;
    }

    // detect if beginning of single line comment
    const singleLineCommentStart = tryParseSingleLineCommentStart({
      code: code.slice(currIndex),
      singleLineCommentIdentifiers,
    });
    if (singleLineCommentStart !== null && not(isEscaped)) {
      singleLineCommentStartIndex = currIndex;
      currIndex += 1;
      continue;
    }

    // detect if beginning of multiline line comment
    const multiLineCommentStart = tryParseMultilineLineCommentStart({
      code: code.slice(currIndex),
      multiLineCommentStartIdentifiers: Array.from(multiLineCommentIdentifierPairs.keys()),
    });
    if (multiLineCommentStart !== null && not(isEscaped)) {
      multiLineCommentStartIndex = currIndex;
      multilineCommentStartString = multiLineCommentStart;
      currIndex += multiLineCommentStart.length;
      continue;
    }

    currIndex += 1;
  }

  // check if inside single line comment
  if (singleLineCommentStartIndex !== null) {
    commentIndices.push({
      start: singleLineCommentStartIndex,
      end: code.length - 1,
    });
  }

  // check if inside multiline comment
  if (multiLineCommentStartIndex !== null) {
    commentIndices.push({
      start: multiLineCommentStartIndex,
      end: code.length - 1,
    });
  }

  // no comments in code
  if (commentIndices.length === 0) {
    return [
      {
        isComment: false,
        value: code,
      },
    ];
  }

  // could be optimized
  let codeIndex = 0;
  return commentIndices
    .reduce((prev, current, currentIndex) => {
      prev.push({
        isComment: false,
        value: code.slice(codeIndex, current.start),
      });
      prev.push({
        isComment: true,
        value: code.slice(current.start, current.end + 1),
      });
      codeIndex = current.end + 1;

      // last pair
      if (currentIndex === commentIndices.length - 1) {
        // some code is left after last comment
        if (current.end < code.length - 1) {
          prev.push({
            isComment: false,
            value: code.slice(current.end + 1, code.length),
          });
        }
      }
      return prev;
    }, [] as ParseCodeCommentsResult)
    .filter(({ value }) => value.length > 0);
}
