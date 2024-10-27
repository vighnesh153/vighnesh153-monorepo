import { assertEquals, assertFalse } from "@std/assert";
import {
  areArraysEqual,
  type ArrayComparator,
  isArrayGreaterThan,
  isArrayGreaterThanOrEqualTo,
  isArrayLessThan,
  isArrayLessThanOrEqualTo,
} from "./array_comparison.ts";

Deno.test("Simple array equality", () => {
  assertEquals(areArraysEqual([1, 2, 3], [1, 2, 3]), true);
});

Deno.test("Simple array inequality", () => {
  assertFalse(areArraysEqual([1, 2, 5], [1, 2, 4]));
  assertFalse(areArraysEqual([1, 2, 5], [1, 2, 5, 9]));
});

Deno.test("Complex array equality", () => {
  assertEquals(
    areArraysEqual(
      [{ name: "Pikachu" }, { name: "Charizard" }],
      [{ name: "Pikachu" }, { name: "Charizard" }],
      ((pokemon1, pokemon2) =>
        pokemon1.name.localeCompare(pokemon2.name)) as ArrayComparator<
          { name: string }
        >,
    ),
    true,
  );
});

Deno.test("Complex array inequality", () => {
  assertFalse(
    areArraysEqual(
      [{ name: "Pikachu" }, { name: "Charizard" }],
      [{ name: "Pika Pika" }, { name: "Charizard" }],
      ((pokemon1, pokemon2) =>
        pokemon1.name.localeCompare(pokemon2.name)) as ArrayComparator<
          { name: string }
        >,
    ),
  );
});

Deno.test("Simple array less than", () => {
  assertEquals(isArrayLessThan([1, 2, 3], [1, 2, 4]), true);
  assertEquals(isArrayLessThan([1, 2, 5], [1, 2, 4]), false);
});

Deno.test("Complex array less than", () => {
  const comparator = (el1: { age: number }, el2: { age: number }) =>
    el1.age < el2.age ? -1 : el1.age === el2.age ? 0 : 1;

  assertEquals(
    isArrayLessThan(
      [{ age: 21 }, { age: 23 }],
      [{ age: 21 }, { age: 25 }],
      comparator,
    ),
    true,
  );
  assertEquals(
    isArrayLessThan(
      [{ age: 21 }, { age: 23 }],
      [{ age: 21 }, { age: 22 }],
      comparator,
    ),
    false,
  );
});

Deno.test("Simple array less than or equal to", () => {
  assertEquals(isArrayLessThanOrEqualTo([1, 2, 3], [1, 2, 4]), true);
  assertEquals(isArrayLessThanOrEqualTo([1, 2, 4], [1, 2, 4]), true);
  assertEquals(isArrayLessThanOrEqualTo([1, 2, 5], [1, 2, 4]), false);
});

Deno.test("Simple array greater than", () => {
  assertEquals(isArrayGreaterThan([1, 2, 4], [1, 2, 3]), true);
  assertEquals(isArrayGreaterThan([1, 2, 3], [1, 2, 4]), false);
});

Deno.test("Simple array greater than or equal to", () => {
  assertEquals(isArrayGreaterThanOrEqualTo([1, 2, 4], [1, 2, 3]), true);
  assertEquals(isArrayGreaterThanOrEqualTo([1, 2, 4], [1, 2, 4]), true);
  assertEquals(isArrayGreaterThanOrEqualTo([1, 2, 3], [1, 2, 4]), false);
});
