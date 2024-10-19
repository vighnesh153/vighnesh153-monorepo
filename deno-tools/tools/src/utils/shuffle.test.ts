import {
  assertArrayIncludes,
  assertEquals,
  assertStringIncludes,
} from "@std/assert";
import { shuffleIterable, shuffleString } from "./shuffle.ts";

Deno.test("shuffleIterable tests", () => {
  const initial = [1, 2, 3, 4, 5];
  const shuffled = shuffleIterable(initial);

  assertEquals(shuffled.length, initial.length);
  assertArrayIncludes(shuffled, initial);
});

Deno.test("shuffleString tests", () => {
  const initial = "life";
  const shuffled = shuffleString(initial);

  assertEquals(shuffled.length, initial.length);
  assertStringIncludes(shuffled, initial);
});
