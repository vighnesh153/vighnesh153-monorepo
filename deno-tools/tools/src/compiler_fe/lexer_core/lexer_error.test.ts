import { assertEquals, assertNotStrictEquals } from "@std/assert";
import { LexerError } from "./lexer_error.ts";

Deno.test("should create the error object", () => {
  const error = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "UNCLOSED_COMMENT_LITERAL" },
  });

  assertEquals(error.columnNumber, 999);
  assertEquals(error.lineNumber, 100);
  assertEquals(error.errorCategory, {
    type: "UNCLOSED_COMMENT_LITERAL",
  });
});

Deno.test("should copy the error object", () => {
  const error = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "ILLEGAL_CHARACTER", ch: "{" },
  });
  const copy = error.copy();

  assertNotStrictEquals(copy, error);
  assertEquals(copy.columnNumber, 999);
  assertEquals(copy.lineNumber, 100);
  assertEquals(copy.errorCategory, {
    type: "ILLEGAL_CHARACTER",
    ch: "{",
  });
});

Deno.test("copy should allow overriding errorMessage in error object", () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "ILLEGAL_CHARACTER", ch: "{" },
  }).copy({
    errorCategory: { type: "INVALID_ESCAPE_CHARACTER_LITERAL", ch: ";" },
  });

  assertEquals(copy.errorCategory, {
    type: "INVALID_ESCAPE_CHARACTER_LITERAL",
    ch: ";",
  });
});

Deno.test("copy should allow overriding lineNumber in error object", () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "UNCLOSED_COMMENT_LITERAL" },
  }).copy({
    lineNumber: 101,
  });

  assertEquals(copy.lineNumber, 101);
});

Deno.test("copy should allow overriding columnNumber in error object", () => {
  const copy = new LexerError({
    columnNumber: 999,
    lineNumber: 100,
    errorCategory: { type: "UNCLOSED_COMMENT_LITERAL" },
  }).copy({
    columnNumber: 1001,
  });

  assertEquals(copy.columnNumber, 1001);
});
