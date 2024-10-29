export const DIGITS: "0123456789" = "0123456789" as const;

export const LOWERCASE_HEXADECIMAL_DIGITS: "0123456789abcdef" =
  /* @__PURE__ */ (() => `${DIGITS}abcdef` as const)();

export const UPPERCASE_HEXADECIMAL_DIGITS: "0123456789ABCDEF" =
  /* @__PURE__ */ (() => `${DIGITS}ABCDEF` as const)();

export const HEXADECIMAL_DIGITS: "0123456789abcdefABCDEF" =
  /* @__PURE__ */ (() => `${DIGITS}abcdefABCDEF` as const)();

export const OCTAL_DIGITS: "01234567" = "01234567" as const;

export const WHITESPACE_CHARACTERS: " \t\n\r" = " \t\n\r" as const;

export const LOWERCASE_ALPHABET: "abcdefghijklmnopqrstuvwxyz" =
  `abcdefghijklmnopqrstuvwxyz` as const;

export const UPPERCASE_ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" =
  /* @__PURE__ */ LOWERCASE_ALPHABET.toUpperCase() as Uppercase<
    typeof LOWERCASE_ALPHABET
  >;

export const ALPHABET: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" =
  /* @__PURE__ */ (() => (
    (LOWERCASE_ALPHABET +
      UPPERCASE_ALPHABET) as `${typeof LOWERCASE_ALPHABET}${Uppercase<
        typeof LOWERCASE_ALPHABET
      >}`
  ))();

export const PUNCTUATION: `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~` =
  `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~` as const;

export const PRINTABLE_CHARACTERS = /* @__PURE__ */ [
  DIGITS,
  ALPHABET,
  PUNCTUATION,
  WHITESPACE_CHARACTERS,
].join(
  "",
) as `${typeof DIGITS}${typeof ALPHABET}${typeof PUNCTUATION}${typeof WHITESPACE_CHARACTERS}`;
