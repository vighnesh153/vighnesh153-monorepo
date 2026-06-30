import { assertEquals } from "@std/assert";
import { StringLexerInput } from "./lexer_input.ts";
import { EOF_CHARACTER } from "./utils.ts";

Deno.test("StringLexerInput should return size of input correctly", () => {
  assertEquals(new StringLexerInput("").getSize(), 0);
  assertEquals(new StringLexerInput("abc").getSize(), 3);
});

Deno.test("StringLexerInput should return corresponding character at index", () => {
  assertEquals(new StringLexerInput("a").getCharacterAt(0), "a");
  assertEquals(new StringLexerInput("abc").getCharacterAt(2), "c");
});

Deno.test("StringLexerInput should return EOF_CHARACTER if out of bounds", () => {
  assertEquals(new StringLexerInput("").getCharacterAt(0), EOF_CHARACTER);
  assertEquals(new StringLexerInput("abc").getCharacterAt(3), EOF_CHARACTER);
  assertEquals(new StringLexerInput("abc").getCharacterAt(4), EOF_CHARACTER);
  assertEquals(new StringLexerInput("abc").getCharacterAt(-1), EOF_CHARACTER);
});
