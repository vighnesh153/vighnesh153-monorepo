import { assertEquals } from "@std/assert";
import { shuffleIterable, shuffleString } from "./shuffle.ts";

Deno.test("shuffleIterable tests", () => {
  const initial = [5, 3, 4, 1, 2];
  const shuffled = shuffleIterable(initial, (a, b) => a < b ? -1 : 1);

  assertEquals(shuffled.length, initial.length);
  assertEquals(shuffled, [1, 2, 3, 4, 5]);
});

Deno.test("shuffleString tests", () => {
  const initial = "life";
  const shuffled = shuffleString(
    initial,
    (a, b) => a.localeCompare(b) <= 0 ? -1 : 1,
  );

  assertEquals(shuffled.length, initial.length);
  assertEquals(shuffled, "efil");
});
