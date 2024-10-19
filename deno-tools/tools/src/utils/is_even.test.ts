import { assertEquals } from "@std/assert";
import { isEven } from "./is_even.ts";

Deno.test("isEven tests", () => {
  assertEquals(isEven(69), false);
  assertEquals(isEven(42), true);
});
