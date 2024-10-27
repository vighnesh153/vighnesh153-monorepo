import { assertEquals } from "@std/assert/equals";
import { binarySearch } from "./binary_search.ts";

Deno.test("Binary search on simple array", () => {
  assertEquals(binarySearch([1, 2, 4, 5, 10], 5), 3);
  assertEquals(binarySearch([1, 2, 4, 5, 10], 10), 4);
  assertEquals(binarySearch([1, 2, 4, 5, 10], 1), 0);
  assertEquals(binarySearch([1, 2, 4, 5, 10], 42), null);
});

Deno.test("Binary search with custom operator", () => {
  const pokemon: { name: string; type: string }[] = [
    { name: "Charizard", type: "fire" },
    { name: "Chikorita", type: "grass" },
    { name: "Pigeot", type: "flying" },
    { name: "Pikachu", type: "electric" },
    { name: "Treeko", type: "grass" },
  ];

  assertEquals(
    binarySearch(
      pokemon,
      { name: "Pikachu", type: "electric" },
      (p1, p2) => p1.name.localeCompare(p2.name) as -1 | 0 | 1,
    ),
    3,
  );

  assertEquals(
    binarySearch(
      pokemon,
      { name: "Dragonite", type: "dragon" },
      (p1, p2) => p1.name.localeCompare(p2.name) as -1 | 0 | 1,
    ),
    null,
  );
});
