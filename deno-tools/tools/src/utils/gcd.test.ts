import { assertEquals, assertThrows } from "@std/assert";
import { gcd } from "./gcd.ts";

Deno.test("gcd tests", () => {
  assertThrows(
    () => gcd(-1),
    'Expected "n" to be a positive integer, found "-1"',
  );

  assertThrows(
    () => gcd(0.5),
    'Expected "n" to be a positive integer, found "0.5"]',
  );

  assertEquals(gcd(), 1);
  assertEquals(gcd(0), 1);
  assertEquals(gcd(1), 1);
  assertEquals(gcd(0, 5), 1);
  assertEquals(gcd(2, 4), 2);
  assertEquals(gcd(4, 4, 4), 4);
  assertEquals(gcd(7, 8, 3), 1);
  assertEquals(gcd(9, 30, 21), 3);
});
