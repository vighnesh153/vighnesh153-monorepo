import { describe, expect, test } from "vitest";
import { StringLexerInput } from "./LexerInput.ts";
import { EOF_CHARACTER } from "./utils.ts";

describe("StringLexerInput tests", () => {
  test("should return size of input correctly", () => {
    expect(new StringLexerInput("").getSize()).toBe(0);
    expect(new StringLexerInput("abc").getSize()).toBe(3);
  });

  test("should return corresponding character at index", () => {
    expect(new StringLexerInput("a").getCharacterAt(0)).toBe("a");
    expect(new StringLexerInput("abc").getCharacterAt(2)).toBe("c");
  });

  test("should return EOF_CHARACTER if out of bounds", () => {
    expect(new StringLexerInput("").getCharacterAt(0)).toBe(EOF_CHARACTER);
    expect(new StringLexerInput("abc").getCharacterAt(3)).toBe(EOF_CHARACTER);
    expect(new StringLexerInput("abc").getCharacterAt(4)).toBe(EOF_CHARACTER);
    expect(new StringLexerInput("abc").getCharacterAt(-1)).toBe(EOF_CHARACTER);
  });
});
