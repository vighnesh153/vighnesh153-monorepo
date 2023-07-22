import { DatatypeParser } from '@/parsers/data-type-parsers/datatype-parser';
import { NumberParser } from '@/parsers/data-type-parsers/primitive-parsers/number-parser';

describe('check the functionality of tryParse in number parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = NumberParser.instance;
  });

  test('should have a type method return "number" string.', () => {
    const result = parser.type();
    expect(result).toStrictEqual('number');
  });

  test('should return false when tryParse is invoked with empty string as arg', () => {
    const input = '';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false when tryParse is invoked with whitespace string as arg', () => {
    const input = '  \t\t \n\n \r \r   ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false when non-number characters are passed.', () => {
    const input = 'a';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false when mixed characters are passed.', () => {
    const input = '123a';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return true when integer as string is passed.', () => {
    const input = '123';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true when floating-point number as string is passed.', () => {
    const input = '999.888';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });
});

describe('check the functionality of parse in number parser.', () => {
  let parser: DatatypeParser;
  beforeEach(() => {
    parser = NumberParser.instance;
  });

  test('should return an integer from the string.', () => {
    const input = '123';

    const result = parser.parse(input);
    expect(result).toStrictEqual(123);
  });

  test('should return a floating number from the string.', () => {
    const input = '999.888';

    const result = parser.parse(input);
    expect(result).toStrictEqual(999.888);
  });
});
