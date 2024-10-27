import { assertEquals } from "@std/assert";
import { isOdd } from "./is_odd.ts";

Deno.test("isOdd tests", () => {
  assertEquals(isOdd(69), true);
  assertEquals(isOdd(42), false);
});
