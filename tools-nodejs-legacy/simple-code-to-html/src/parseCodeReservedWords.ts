export interface ParseCodeReservedWordsOptions {
  reservedWords: string[];
}

type ParseCodeReservedWordsResult = Array<{
  isReservedWord: boolean;
  value: string;
}>;

export function parseCodeReservedWords(
  code: string,
  options: ParseCodeReservedWordsOptions,
): ParseCodeReservedWordsResult {
  const reservedWords = Array.from(new Set(options.reservedWords)).sort((
    a,
    b,
  ) => (a.length >= b.length ? -1 : 1));

  const reservedWordIndices: { start: number; end: number }[] = [];

  {
    let currentIndex = 0;

    whileLabel: while (currentIndex < code.length) {
      const slicedCode = code.slice(currentIndex);

      for (let i = 0; i < reservedWords.length; i++) {
        const reservedWord = reservedWords[i];
        if (slicedCode.startsWith(reservedWord)) {
          reservedWordIndices.push({
            start: currentIndex,
            end: currentIndex + reservedWord.length - 1,
          });
          currentIndex += reservedWord.length;
          continue whileLabel;
        }
      }

      currentIndex += 1;
    }
  }

  // no reserved words
  if (reservedWordIndices.length === 0) {
    return [
      {
        isReservedWord: false,
        value: code,
      },
    ];
  }

  // could be optimized
  let codeIndex = 0;
  return reservedWordIndices
    .reduce((prev, current, currentIndex) => {
      prev.push({
        isReservedWord: false,
        value: code.slice(codeIndex, current.start),
      });
      prev.push({
        isReservedWord: true,
        value: code.slice(current.start, current.end + 1),
      });
      codeIndex = current.end + 1;

      // last pair
      if (currentIndex === reservedWordIndices.length - 1) {
        // some code is left after last string
        if (current.end < code.length - 1) {
          prev.push({
            isReservedWord: false,
            value: code.slice(current.end + 1, code.length),
          });
        }
      }
      return prev;
    }, [] as ParseCodeReservedWordsResult)
    .filter(({ value }) => value.length > 0);
}
