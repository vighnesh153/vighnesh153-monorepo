import { BlockParser } from '@/parsers/block-parsers/block-parser';
// prettier-ignore
import { 
  VariableDeclarationParser,
} from '@/parsers/block-parsers/variable-statements-parser/variable-declaration-parser';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { VariableBlock } from '@/blocks/variable-blocks/variable-block';
import { ArrayVariableBlock } from '@/blocks/variable-blocks/array-variable-block';

describe('should parse the matching declaration statement.', () => {
  let blockParser: BlockParser;
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [new LineOfCode('', Math.random())];
    blockParser = new VariableDeclarationParser(scope, linesOfCode);
  });

  test('should return false if empty statement is passed.', () => {
    linesOfCode[0].value = '';

    const result = blockParser.tryParse();
    expect(result).toStrictEqual(false);
  });

  test.each([
    '   let number a be 1', // Indentation
    'let array of   A be [1 ,2 ,3]', // Type of array not specified
  ])('should return false if incorrect statement is passed.', (input: string) => {
    linesOfCode[0].value = input;

    const result = blockParser.tryParse();
    expect(result).toStrictEqual(false);
  });

  test.each(['let number a be 111', 'let array of number, A, be [1, 2, 3]', 'let array of number, A, be []'])(
    'should return true if correct statement is passed.',
    (input: string) => {
      linesOfCode[0].value = input;

      expect(blockParser.tryParse()).toStrictEqual(true);
    }
  );
});

describe('should return correct block.', () => {
  let blockParser: BlockParser;
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [new LineOfCode('', Math.random())];
    blockParser = new VariableDeclarationParser(scope, linesOfCode);
  });

  test('should return correct primitive block.', () => {
    // eslint-disable-next-line quotes
    linesOfCode[0].value = "let string s be 'Hello World!'";

    const block = blockParser.parse() as VariableBlock;
    expect(block.value).toStrictEqual('Hello World!');
    expect(block.variableName).toStrictEqual('s');
    expect(block.typeOfVariable).toStrictEqual('string');
  });

  test('should return correct array block.', () => {
    linesOfCode[0].value = 'let array of number, A, be [1, 2, 3]';

    const block = blockParser.parse() as ArrayVariableBlock;
    expect(block.value).toStrictEqual([1, 2, 3]);
    expect(block.variableName).toStrictEqual('A');
    expect(block.typeOfVariable).toStrictEqual('array');
    expect(block.typeOfArray).toStrictEqual('number');
  });

  test('should return correct array block even if values are empty.', () => {
    linesOfCode[0].value = 'let array of number, A, be []';

    const block = blockParser.parse() as ArrayVariableBlock;
    expect(block.value).toStrictEqual([]);
    expect(block.variableName).toStrictEqual('A');
    expect(block.typeOfVariable).toStrictEqual('array');
    expect(block.typeOfArray).toStrictEqual('number');
  });
});
