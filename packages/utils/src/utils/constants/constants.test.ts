import { describe, expect, test } from 'vitest';
import {
  ALPHABET,
  DIGITS,
  HEXADECIMAL_DIGITS,
  LOWERCASE_ALPHABET,
  LOWERCASE_HEXADECIMAL_DIGITS,
  OCTAL_DIGITS,
  PRINTABLE_CHARACTERS,
  PUNCTUATION,
  UPPERCASE_ALPHABET,
  UPPERCASE_HEXADECIMAL_DIGITS,
  WHITESPACE_CHARACTERS,
} from './constants';

describe('Utils > constants tests', () => {
  test('decimal digits', () => {
    expect(DIGITS).toBe('0123456789');
  });

  test('lower case hexadecimal digits ', () => {
    expect(LOWERCASE_HEXADECIMAL_DIGITS).toBe('0123456789abcdef');
  });

  test('upper case hexadecimal digits ', () => {
    expect(UPPERCASE_HEXADECIMAL_DIGITS).toBe('0123456789ABCDEF');
  });

  test('hexadecimal digits ', () => {
    expect(HEXADECIMAL_DIGITS).toBe('0123456789abcdefABCDEF');
  });

  test('octal digits', () => {
    expect(OCTAL_DIGITS).toBe('01234567');
  });

  test('whitespace characters', () => {
    expect(WHITESPACE_CHARACTERS).toBe(' \t\n\r');
  });

  test('lower case alphabet', () => {
    expect(LOWERCASE_ALPHABET).toBe('abcdefghijklmnopqrstuvwxyz');
  });

  test('upper case alphabet', () => {
    expect(UPPERCASE_ALPHABET).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  });

  test('alphabet', () => {
    expect(ALPHABET).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  });

  test('punctuation', () => {
    expect(PUNCTUATION).toBe(`!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`);
  });

  test('printable characters', () => {
    expect(PRINTABLE_CHARACTERS).toBe([DIGITS, ALPHABET, PUNCTUATION, WHITESPACE_CHARACTERS].join(''));
  });
});
