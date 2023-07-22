import { isValidIdentifier } from '@/helpers/is-valid-identifier';

describe('check the functionality of the identifier name check.', () => {
  test.each([
    ['', false],
    ['123', false],
    ['   __', true],
    ['abc', true],
    [' _a', true],
    [' _1', true],
    [' _tempo', true],
    [' a 1', false],
    ['1a', false],
    ['a1.4', false],
    [' 9_9', false],
    [' _9_9', true],
  ])('some asserts', (input: string, expected: boolean) => {
    const result = isValidIdentifier(input);
    expect(result).toStrictEqual(expected);
  });
});
