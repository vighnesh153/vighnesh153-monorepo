import { DatatypeParser } from '@/parsers/data-type-parsers/datatype-parser';
import { BooleanParser } from '@/parsers/data-type-parsers/primitive-parsers/boolean-parser';

describe('check the tryParse method of boolean parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = BooleanParser.instance;
  });

  test('should have method type return "boolean"', () => {
    const result = parser.type();
    expect(result).toStrictEqual('boolean');
  });

  test('should return false for empty input.', () => {
    const input = '';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for whitespace input.', () => {
    const input = '\t\t \n\n\n\r    \n';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for string input.', () => {
    const input = 'some string';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for integer input.', () => {
    const input = '123';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for floating point input.', () => {
    const input = '999.888';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return true for "true" input.', () => {
    const input = ' true ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for "false" input.', () => {
    const input = ' false ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });
});

describe('check the parse method of the boolean parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = BooleanParser.instance;
  });

  test('should return true for "  true   " input.', () => {
    const input = '  true   ';

    const result = parser.parse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return false for "false" input.', () => {
    const input = 'false';

    const result = parser.parse(input);
    expect(result).toStrictEqual(false);
  });
});
