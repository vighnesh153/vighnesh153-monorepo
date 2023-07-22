import { parseInitialNumberOrIdentifier } from '@/helpers/parse-initial-number-or-identifier';

test.each([
  ['abc', 'abc'],
  ['  m m', '  m'],
  ['42394.23423', '42394.23423'],
  ['some_identifier_', 'some_identifier_'],
  ['324234_423423', '324234_423423'],
  [' 1+2*3', ' 1+2*3'],
])('check the parse-initial-number-or-identifier functionality.', (input: string, expected: string) => {
  const result = parseInitialNumberOrIdentifier(input);
  expect(result).toStrictEqual(expected);
});
