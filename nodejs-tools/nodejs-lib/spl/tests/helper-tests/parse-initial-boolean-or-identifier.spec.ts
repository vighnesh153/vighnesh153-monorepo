import { parseInitialBooleanOrIdentifier } from '@/helpers/parse-initial-boolean-or-identifier';

test.each([
  ['abc', 'abc'],
  ['  true something_else', '  true'],
  ['42394.23423', '42394'],
  ['some_identifier_', 'some_identifier_'],
  ['false true', 'false'],
])('check the parse-initial-boolean-or-identifier functionality.', (input: string, expected: string) => {
  const result = parseInitialBooleanOrIdentifier(input);
  expect(result).toStrictEqual(expected);
});
