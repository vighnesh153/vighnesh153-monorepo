import { initialWhitespaceConverter } from '@/pre-processing/initial-whitespace-converter';
import { LineOfCode } from '@/models/LineOfCode';

describe('check if the initial white space is mapped to space character', () => {
  test('should not convert lines that have no whitespace at start.', () => {
    const linesOfCode: LineOfCode[] = [new LineOfCode('code line', Math.random())];
    const actual = initialWhitespaceConverter(linesOfCode);
    expect(actual[0].value).toStrictEqual('code line');
  });

  test('should not leave tab character as is, at start.', () => {
    const linesOfCode: LineOfCode[] = [new LineOfCode('\t', Math.random())];
    const actual = initialWhitespaceConverter(linesOfCode);
    expect(actual[0].value).not.toStrictEqual('\t');
  });

  test('should convert tab character at start to 4 space characters.', () => {
    const linesOfCode: LineOfCode[] = [new LineOfCode('\t', Math.random())];
    const actual = initialWhitespaceConverter(linesOfCode);
    expect(actual[0].value).toStrictEqual('    ');
  });

  test('should convert non-space whitespaces at start of lines to space characters', () => {
    const linesOfCode: LineOfCode[] = [new LineOfCode('\t line of code', Math.random())];
    const actual = initialWhitespaceConverter(linesOfCode);
    expect(actual[0].value).toStrictEqual('     line of code');
  });

  test('should convert mixed whitespace characters at start to space characters.', () => {
    const linesOfCode: LineOfCode[] = [new LineOfCode('\t \t\t  ', Math.random())];
    const actual = initialWhitespaceConverter(linesOfCode);
    expect(actual[0].value).toStrictEqual('               ');
  });
});
