import { expect, test } from "vitest";
import { LexerError } from "./LexerError.ts";

test("should create the error object", () => {
  const error = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "UNCLOSED_COMMENT_LITERAL" },
  });

  expect(error.columnNumber).toBe(999);
  expect(error.lineNumber).toBe(100);
  expect(error.errorCategory).toStrictEqual({
    type: "UNCLOSED_COMMENT_LITERAL",
  });
});

test("should copy the error object", () => {
  const error = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "ILLEGAL_CHARACTER", ch: "{" },
  });
  const copy = error.copy();

  expect(copy).not.toBe(error);
  expect(copy.columnNumber).toBe(999);
  expect(copy.lineNumber).toBe(100);
  expect(copy.errorCategory).toStrictEqual({
    type: "ILLEGAL_CHARACTER",
    ch: "{",
  });
});

test("copy should allow overriding errorMessage in error object", () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "ILLEGAL_CHARACTER", ch: "{" },
  }).copy({
    errorCategory: { type: "INVALID_ESCAPE_CHARACTER_LITERAL", ch: ";" },
  });

  expect(copy.errorCategory).toStrictEqual({
    type: "INVALID_ESCAPE_CHARACTER_LITERAL",
    ch: ";",
  });
});

test("copy should allow overriding lineNumber in error object", () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "UNCLOSED_COMMENT_LITERAL" },
  }).copy({
    lineNumber: 101,
  });

  expect(copy.lineNumber).toBe(101);
});

test("copy should allow overriding columnNumber in error object", () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "UNCLOSED_COMMENT_LITERAL" },
  }).copy({
    columnNumber: 1001,
  });

  expect(copy.columnNumber).toBe(1001);
});
