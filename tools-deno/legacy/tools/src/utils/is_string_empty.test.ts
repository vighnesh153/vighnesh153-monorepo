import { assertEquals } from "@std/assert";
import { isStringEmpty } from "./is_string_empty.ts";

Deno.test("isStringEmpty tests", () => {
  assertEquals(isStringEmpty(), true);
  assertEquals(isStringEmpty(undefined), true);
  assertEquals(isStringEmpty(null), true);
  assertEquals(isStringEmpty(""), true);
  assertEquals(isStringEmpty("    "), true);
  assertEquals(isStringEmpty("  \n \t \r"), true);
  assertEquals(isStringEmpty("Pikachu is love ❤️"), false);
});
