/* eslint-disable quotes */
import { DatatypeParser } from '@/parsers/data-type-parsers/datatype-parser';
import { StringParser } from '@/parsers/data-type-parsers/primitive-parsers/string-parser';

describe('check the tryParse method of string parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = StringParser.instance;
  });

  test('should have method type return "string"', () => {
    const result = parser.type();
    expect(result).toStrictEqual('string');
  });

  test('should return false for empty input.', () => {
    const input = '';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return true for empty string input.', () => {
    const input = "''";

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return false for whitespace input.', () => {
    const input = '\t\t \n\n\r    \n';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for floating point input.', () => {
    const input = '123.44';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for integer input.', () => {
    const input = '1234';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for boolean input.', () => {
    const input = ' true ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return true if single string passed.', () => {
    const input = "'Hello'";

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return false if multiple strings passed.', () => {
    const input = "'Hello' 'World'";

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });
});

describe('check the parse method of string-parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = StringParser.instance;
  });

  test('should return the actual string from the input.', () => {
    const input = "   'Hello World!' ";

    const result = parser.parse(input);
    expect(result).toStrictEqual('Hello World!');
  });
});
