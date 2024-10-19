import { assertEquals } from "@std/assert";
import { reverseString } from "./reverse_string.ts";

Deno.test("reverseString tests", () => {
  assertEquals(reverseString(""), "");
  assertEquals(reverseString("a"), "a");
  assertEquals(reverseString("Abc"), "cbA");
});
