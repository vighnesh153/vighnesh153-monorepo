import { isWhiteSpaceOrEmpty } from '@/helpers/is-whitespace-or-empty';
import { LineOfCode } from '@/models/LineOfCode';

export const extractEffectiveLoc = (code: string): LineOfCode[] => {
  const lines = code.split('\n');
  const effectiveLinesOfCode: LineOfCode[] = [];

  lines.forEach((lineContent, index) => {
    if (isWhiteSpaceOrEmpty(lineContent) === false) {
      const lineNumber = index + 1;
      effectiveLinesOfCode.push(new LineOfCode(lineContent, lineNumber));
    }
  });
  return effectiveLinesOfCode;
};
