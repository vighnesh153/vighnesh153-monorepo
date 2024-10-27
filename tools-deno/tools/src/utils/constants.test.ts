import { assertEquals } from "@std/assert";
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
} from "./constants.ts";

Deno.test("constants tests", () => {
  assertEquals(DIGITS, "0123456789");
  assertEquals(LOWERCASE_HEXADECIMAL_DIGITS, "0123456789abcdef");
  assertEquals(UPPERCASE_HEXADECIMAL_DIGITS, "0123456789ABCDEF");
  assertEquals(HEXADECIMAL_DIGITS, "0123456789abcdefABCDEF");
  assertEquals(OCTAL_DIGITS, "01234567");
  assertEquals(WHITESPACE_CHARACTERS, " \t\n\r");
  assertEquals(LOWERCASE_ALPHABET, "abcdefghijklmnopqrstuvwxyz");
  assertEquals(UPPERCASE_ALPHABET, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  assertEquals(
    ALPHABET,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  );
  assertEquals(PUNCTUATION, `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`);
  assertEquals(
    PRINTABLE_CHARACTERS,
    [DIGITS, ALPHABET, PUNCTUATION, WHITESPACE_CHARACTERS].join(""),
  );
});
