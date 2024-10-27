import { assertEquals, assertThrows } from "@std/assert";
import { factorial } from "./factorial.ts";

Deno.test("factorial tests", () => {
  assertThrows(
    () => factorial(2213.3),
    Error,
    "Factorial of fractional numbers is not defined",
  );

  assertThrows(
    () => factorial(-4),
    Error,
    "Factorial of negative numbers is not defined",
  );

  assertEquals(factorial(1), 1);
  assertEquals(factorial(3), 6);
  assertEquals(factorial(5), 120);
  assertEquals(factorial(10), 3628800);
});
