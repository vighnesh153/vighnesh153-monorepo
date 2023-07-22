/* eslint-disable quotes */
import { DatatypeParser } from '@/parsers/data-type-parsers/datatype-parser';
import { ArrayParser } from '@/parsers/data-type-parsers/non-primitive-parsers/array-parser';

describe('check the tryParse method in array parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = ArrayParser.instance;
  });

  test('should have type method return "array".', () => {
    const result = parser.type();
    expect(result).toStrictEqual('array');
  });

  test('should return false for empty string as an input', () => {
    const input = '';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for integer input.', () => {
    const input = '123';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for boolean input.', () => {
    const input = 'true  ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for floating point input.', () => {
    const input = '999.888';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for incorrect array syntax', () => {
    expect(parser.tryParse('[')).toStrictEqual(false);
    expect(parser.tryParse(']')).toStrictEqual(false);
  });

  test('should return true for empty array.', () => {
    const input = '[]';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for input array with numbers.', () => {
    const input = '[1, 2, 3, 5.55 , 10 ]';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for input array with strings.', () => {
    const input = "[ 's1',  's2' , 's3', 's4' ,  ' 1 0' ]";

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for input array of one number.', () => {
    const input = ' [   123.32 ]   ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for input array of one string.', () => {
    const input = " [   '123.32' ]   ";

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for input array of one boolean.', () => {
    const input = ' [   false ]   ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return true for input array with booleans.', () => {
    const input = ' [   true,   false   ,  true,   true     ,    false   ]   ';

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(true);
  });

  test('should return false for input array with different types.', () => {
    const input = " [   false,  true,   1234     ,    'string 1'   ]   ";

    const result = parser.tryParse(input);
    expect(result).toStrictEqual(false);
  });
});

describe('check the parse method in array parser.', () => {
  let parser: DatatypeParser;
  beforeAll(() => {
    parser = ArrayParser.instance;
  });

  test('should return the empty array if empty.', () => {
    const input = ' [    ]   ';

    const result = parser.parse(input);
    expect(result).toStrictEqual([]);
  });

  test('should return the integer array for integer array input.', () => {
    const input = ' [ 123 ,354 , 44 ,434 ,4343    ]   ';

    const result = parser.parse(input);
    expect(result).toStrictEqual([123, 354, 44, 434, 4343]);
  });

  test('should return the floating point array for floating point array input.', () => {
    const input = ' [ 123.324 ,354.54 , 44.00 ,434.4365 ,4343    ]   ';

    const result = parser.parse(input);
    expect(result).toStrictEqual([123.324, 354.54, 44, 434.4365, 4343]);
  });

  test('should return the boolean array for boolean array input.', () => {
    const input = ' [ true  ,false , true ,true ,false    ]   ';

    const result = parser.parse(input);
    expect(result).toStrictEqual([true, false, true, true, false]);
  });
});
