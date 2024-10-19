import { assertEquals } from "@std/assert";
import { not } from "./not.ts";

Deno.test("not tests", () => {
  assertEquals(not(null), true);
  assertEquals(not(undefined), true);
  assertEquals(not(false), true);
  assertEquals(not(true), false);
});
