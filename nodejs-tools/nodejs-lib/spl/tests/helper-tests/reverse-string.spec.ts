import { reverseString } from '@/helpers/reverse-string';

test.each([
  ['Hello', 'olleH'],
  ['vighnesh', 'hsenhgiv'],
  ['  123  ', '  321  '],
])('should reverse the string.', (input: string, expected: string) => {
  const result = reverseString(input);
  expect(result).toStrictEqual(expected);
});
