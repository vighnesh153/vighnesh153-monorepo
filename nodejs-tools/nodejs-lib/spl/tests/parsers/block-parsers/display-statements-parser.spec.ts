/* eslint-disable quotes */
import { BlockParser } from '@/parsers/block-parsers/block-parser';
import { DisplayStatementsParser } from '@/parsers/block-parsers/display-statements-parser';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { OutputBuffer } from '@/models/OutputBuffer';

describe('check the tryParse functionality of display statement parser.', () => {
  let blockParser: BlockParser;
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [new LineOfCode('', Math.random())];
    blockParser = new DisplayStatementsParser(scope, linesOfCode);
  });

  test.each(['', ' display 123', 'display                    \t\t\t    \n\n\n'])(
    'should return false for incorrect display statements format.',
    (input) => {
      linesOfCode[0].value = input;

      const result = blockParser.tryParse();
      expect(result).toStrictEqual(false);
    }
  );

  test.each(['display 123', "display    'Hello world'    , 1234", 'display    [1, 2, 3, 4]'])(
    'should return true for correct display statements format.',
    (input) => {
      linesOfCode[0].value = input;

      const result = blockParser.tryParse();
      expect(result).toStrictEqual(true);
    }
  );
});

describe('check the parse functionality of display statement parser.', () => {
  let blockParser: BlockParser;
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [new LineOfCode('', Math.random())];
    blockParser = new DisplayStatementsParser(scope, linesOfCode);
  });

  it('should display a number.', () => {
    linesOfCode[0].value = 'display 123';

    const block = blockParser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('123\n');
  });

  it('should display a string.', () => {
    linesOfCode[0].value = "display  'vighnesh 153'";

    const block = blockParser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('vighnesh 153\n');
  });

  it('should display an array.', () => {
    linesOfCode[0].value = 'display  [true, false, false]';

    const block = blockParser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('true,false,false\n');
  });

  it('should display array with expression evaluated.', () => {
    linesOfCode[0].value = 'display 123';

    const block = blockParser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('123\n');
  });

  it('should display comma separated expressions.', () => {
    linesOfCode[0].value = "display 'Case: ', 1, ', answer: ', [ 1, 2, 3, 4]";

    const block = blockParser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('Case: 1, answer: 1,2,3,4\n');
  });
});
