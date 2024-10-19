import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";
import { range } from "./range.ts";

Deno.test("range should throw error if step is 0", () => {
  assertThrows(
    () => Array.from(range(1, 10, 0)),
    'Expected "step" to be non-zero, found "0"',
  );
});

Deno.test("range should throw error if start < end and step < 0", () => {
  assertThrows(
    () => Array.from(range(1, 10, -2)),
    'Expected "step" to be positive if "start" is less than "end"',
  );
});

Deno.test("range should throw error if start > end and step > 0", () => {
  assertThrows(
    () => Array.from(range(100, 10, 2)),
    'Expected "step" to be negative if "start" is greater than "end"',
  );
});

Deno.test("range should return a generator of numbers from 1 to 3", () => {
  const r = range(1, 3);

  let next = r.next();
  assertEquals(next.done, false);
  assertEquals(next.value, 1);

  next = r.next();
  assertEquals(next.done, false);
  assertEquals(next.value, 2);

  next = r.next();
  assertEquals(next.done, false);
  assertEquals(next.value, 3);

  next = r.next();
  assertEquals(next.done, true);
  assertEquals(next.value, undefined);
});

Deno.test("range should support steps of 2", () => {
  const r = range(1, 10, 2);

  assertStrictEquals(Array.from(r), [1, 3, 5, 7, 9]);
});

Deno.test("range should support negative steps", () => {
  const r = range(3, 1, -1);

  assertStrictEquals(Array.from(r), [3, 2, 1]);
});
