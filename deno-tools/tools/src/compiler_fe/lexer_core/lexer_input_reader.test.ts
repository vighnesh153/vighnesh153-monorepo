import { assertEquals, assertThrows } from "@std/assert";
import { LexerInputReader } from "./lexer_input_reader.ts";
import { StringLexerInput } from "./lexer_input.ts";
import { EOF_CHARACTER } from "./utils.ts";

Deno.test("should read empty string without errors", () => {
  const input = new StringLexerInput("");
  const reader = new LexerInputReader(input);

  assertEquals(reader.currentCharacter, EOF_CHARACTER);
});

Deno.test("should read string, of single character, without errors", () => {
  const input = new StringLexerInput("p");
  const reader = new LexerInputReader(input);

  assertEquals(reader.currentCharacter, "p");
});

Deno.test("should update currentCharacter when readNextCharacter is called", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  assertEquals(reader.currentCharacter, "p");
  reader.readNextCharacter();
  assertEquals(reader.currentCharacter, "i");
  reader.readNextCharacter();
  assertEquals(reader.currentCharacter, "k");
  reader.readNextCharacter();
  assertEquals(reader.currentCharacter, "a");
});

Deno.test(
  "current character should be EOF when the entire input is done reading " +
    "no matter how many times readNextCharacter is called",
  () => {
    const input = new StringLexerInput("abc");
    const reader = new LexerInputReader(input);

    assertEquals(reader.currentCharacter, "a");
    reader.readNextCharacter();
    assertEquals(reader.currentCharacter, "b");
    reader.readNextCharacter();
    assertEquals(reader.currentCharacter, "c");
    reader.readNextCharacter();
    assertEquals(reader.currentCharacter, EOF_CHARACTER);
    reader.readNextCharacter();
    assertEquals(reader.currentCharacter, EOF_CHARACTER);
  },
);

Deno.test("should update currentIndex when readNextCharacter is called and should stick to size of input at end", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  assertEquals(reader.currentIndex, 0);
  reader.readNextCharacter();
  assertEquals(reader.currentIndex, 1);
  reader.readNextCharacter();
  assertEquals(reader.currentIndex, 2);
  reader.readNextCharacter();
  assertEquals(reader.currentIndex, 3);
  reader.readNextCharacter();
  assertEquals(reader.currentIndex, 4);
  reader.readNextCharacter();
  assertEquals(reader.currentIndex, 4);
});

Deno.test("should update peekCharacter when readNextCharacter is called", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  assertEquals(reader.peekCharacter(), "i");
  reader.readNextCharacter();
  assertEquals(reader.peekCharacter(), "k");
  reader.readNextCharacter();
  assertEquals(reader.peekCharacter(), "a");
  reader.readNextCharacter();
  assertEquals(reader.peekCharacter(), EOF_CHARACTER);
  reader.readNextCharacter();
  assertEquals(reader.peekCharacter(), EOF_CHARACTER);
});

Deno.test("should throw error if futureOffset is negative integer", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  assertThrows(
    () => reader.peekCharacter(-1),
    "Expected future offset to be a non-negative integer, found '-1'",
  );
});

Deno.test("should throw error if futureOffset is fraction", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  assertThrows(
    () => reader.peekCharacter(0.6),
    Error,
    "Expected future offset to be a non-negative integer, found '0.6'",
  );
});

Deno.test("should return correct peekCharacter when futureOffset is provided", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  assertEquals(reader.peekCharacter(1), "k");
  assertEquals(reader.peekCharacter(2), "a");
  assertEquals(reader.peekCharacter(3), EOF_CHARACTER);
});

Deno.test("should correctly calculate the line and column numbers", () => {
  const input = new StringLexerInput(`
pi
pikachu
`);
  const reader = new LexerInputReader(input);

  // current character is the first character of the above string which is a
  // new line character. Move to next character
  reader.readNextCharacter();

  // line 2
  assertEquals(reader.lineNumber, 2);
  assertEquals(reader.columnNumber, 1);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 2);
  assertEquals(reader.columnNumber, 2);

  reader.readNextCharacter();
  reader.readNextCharacter();

  // line 3
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 1);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 2);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 3);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 4);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 5);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 6);
  reader.readNextCharacter();
  assertEquals(reader.lineNumber, 3);
  assertEquals(reader.columnNumber, 7);

  reader.readNextCharacter();
  reader.readNextCharacter();

  assertEquals(reader.lineNumber, 4);
  assertEquals(reader.columnNumber, 1);
});
