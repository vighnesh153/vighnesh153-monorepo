import { assertEquals, assertNotStrictEquals } from "@std/assert";

import { cloneToken, type Token } from "./tokens.ts";

Deno.test("should clone token", () => {
  const token: Token<"dummy_token_type"> = {
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: "dummy token literal",
    tokenType: "dummy_token_type",
  };

  const clonedToken = cloneToken(token);

  // reference equality
  assertNotStrictEquals(clonedToken, token);
  // value equality
  assertEquals(clonedToken, {
    lineNumber: 43,
    columnNumber: 25,
    tokenLiteral: "dummy token literal",
    tokenType: "dummy_token_type",
  });
});
