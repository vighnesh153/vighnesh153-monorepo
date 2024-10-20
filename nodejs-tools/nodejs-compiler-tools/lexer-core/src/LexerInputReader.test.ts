import { expect, test } from "vitest";
import { LexerInputReader } from "./LexerInputReader.ts";
import { StringLexerInput } from "./LexerInput.ts";
import { EOF_CHARACTER } from "./utils.ts";

test("should read empty string without errors", () => {
  const input = new StringLexerInput("");
  const reader = new LexerInputReader(input);

  expect(reader.currentCharacter).toBe(EOF_CHARACTER);
});

test("should read string, of single character, without errors", () => {
  const input = new StringLexerInput("p");
  const reader = new LexerInputReader(input);

  expect(reader.currentCharacter).toBe("p");
});

test("should update currentCharacter when readNextCharacter is called", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  expect(reader.currentCharacter).toBe("p");
  reader.readNextCharacter();
  expect(reader.currentCharacter).toBe("i");
  reader.readNextCharacter();
  expect(reader.currentCharacter).toBe("k");
  reader.readNextCharacter();
  expect(reader.currentCharacter).toBe("a");
});

test(
  "current character should be EOF when the entire input is done reading " +
    "no matter how many times readNextCharacter is called",
  () => {
    const input = new StringLexerInput("abc");
    const reader = new LexerInputReader(input);

    expect(reader.currentCharacter).toBe("a");
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe("b");
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe("c");
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe(EOF_CHARACTER);
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe(EOF_CHARACTER);
  },
);

test("should update currentIndex when readNextCharacter is called and should stick to size of input at end", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  expect(reader.currentIndex).toBe(0);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(1);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(2);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(3);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(4);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(4);
});

test("should update peekCharacter when readNextCharacter is called", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  expect(reader.peekCharacter()).toBe("i");
  reader.readNextCharacter();
  expect(reader.peekCharacter()).toBe("k");
  reader.readNextCharacter();
  expect(reader.peekCharacter()).toBe("a");
  reader.readNextCharacter();
  expect(reader.peekCharacter()).toBe(EOF_CHARACTER);
  reader.readNextCharacter();
  expect(reader.peekCharacter()).toBe(EOF_CHARACTER);
});

test("should throw error if futureOffset is negative integer", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  expect(() => reader.peekCharacter(-1)).toThrowErrorMatchingInlineSnapshot(
    `[Error: Expected future offset to be a non-negative integer, found '-1']`,
  );
});

test("should throw error if futureOffset is fraction", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  expect(() => reader.peekCharacter(0.6)).toThrowErrorMatchingInlineSnapshot(
    `[Error: Expected future offset to be a non-negative integer, found '0.6']`,
  );
});

test("should return correct peekCharacter when futureOffset is provided", () => {
  const input = new StringLexerInput("pika");
  const reader = new LexerInputReader(input);

  expect(reader.peekCharacter(1)).toBe("k");
  expect(reader.peekCharacter(2)).toBe("a");
  expect(reader.peekCharacter(3)).toBe(EOF_CHARACTER);
});

test("should correctly calculate the line and column numbers", () => {
  const input = new StringLexerInput(`
pi
pikachu
`);
  const reader = new LexerInputReader(input);

  // current character is the first character of the above string which is a
  // new line character. Move to next character
  reader.readNextCharacter();

  // line 2
  expect(reader.lineNumber).toBe(2);
  expect(reader.columnNumber).toBe(1);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(2);
  expect(reader.columnNumber).toBe(2);

  reader.readNextCharacter();
  reader.readNextCharacter();

  // line 3
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(1);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(2);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(3);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(4);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(5);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(6);
  reader.readNextCharacter();
  expect(reader.lineNumber).toBe(3);
  expect(reader.columnNumber).toBe(7);

  reader.readNextCharacter();
  reader.readNextCharacter();

  expect(reader.lineNumber).toBe(4);
  expect(reader.columnNumber).toBe(1);
});
