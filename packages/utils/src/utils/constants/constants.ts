export const DIGITS = '0123456789';

export const LOWERCASE_HEXADECIMAL_DIGITS = `${DIGITS}abcdef`;

export const UPPERCASE_HEXADECIMAL_DIGITS = `${DIGITS}ABCDEF`;

export const HEXADECIMAL_DIGITS = `${DIGITS}abcdefABCDEF`;

export const OCTAL_DIGITS = '01234567';

export const WHITESPACE_CHARACTERS = ' \t\n\r';

export const LOWERCASE_ALPHABET = `abcdefghijklmnopqrstuvwxyz`;

export const UPPERCASE_ALPHABET = LOWERCASE_ALPHABET.toUpperCase();

export const ALPHABET = LOWERCASE_ALPHABET + UPPERCASE_ALPHABET;

export const PUNCTUATION = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

export const PRINTABLE_CHARACTERS = [DIGITS, ALPHABET, PUNCTUATION, WHITESPACE_CHARACTERS].join('');
