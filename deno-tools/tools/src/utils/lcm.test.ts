import { assertEquals, assertThrows } from "@std/assert";
import { lcm } from "./lcm.ts";

Deno.test("lcm tests", () => {
  assertThrows(
    () => lcm(-1),
    Error,
    'Expected "n" to be a positive integer, found "-1"',
  );

  assertThrows(
    () => lcm(0.5),
    Error,
    'Expected "n" to be a positive integer, found "0.5"',
  );

  assertEquals(lcm(), 1);
  assertEquals(lcm(1), 1);
  assertEquals(lcm(2, 4), 4);
  assertEquals(lcm(4, 4, 4), 4);
  assertEquals(lcm(7, 2, 3, 4), 84);
});
