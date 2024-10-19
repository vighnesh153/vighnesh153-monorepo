import { assertEquals } from "@std/assert/equals";
import { binarySearchLeftmost } from "./binary_search_leftmost.ts";

Deno.test("Binary search leftmost on simple array", () => {
  assertEquals(binarySearchLeftmost([1, 2, 4, 5, 10], 5), 3);
  assertEquals(binarySearchLeftmost([1, 2, 2, 2, 2], 2), 1);
  assertEquals(binarySearchLeftmost([1, 2, 2, 2, 2], 1), 0);
  assertEquals(
    binarySearchLeftmost([1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5], 5),
    9,
  );
  assertEquals(binarySearchLeftmost([1, 2, 2, 2, 2], 99), null);
});

Deno.test("Binary search leftmost with custom comparator", () => {
  const pokemon: { name: string; type: string }[] = [
    { name: "Charizard", type: "fire" },
    { name: "Chikorita", type: "grass" },
    { name: "Chikorita", type: "grass" },
    { name: "Pigeot", type: "flying" },
    { name: "Pigeot", type: "flying" },
    { name: "Pikachu", type: "electric" },
    { name: "Pikachu", type: "electric" },
    { name: "Pikachu", type: "electric" },
    { name: "Pikachu", type: "electric" },
    { name: "Treeko", type: "grass" },
    { name: "Treeko", type: "grass" },
  ];

  assertEquals(
    binarySearchLeftmost(
      pokemon,
      { name: "Pikachu", type: "electric" },
      (p1, p2) => p1.name.localeCompare(p2.name) as -1 | 0 | 1,
    ),
    5,
  );

  assertEquals(
    binarySearchLeftmost(
      pokemon,
      { name: "Dragonite", type: "dragon" },
      (p1, p2) => p1.name.localeCompare(p2.name) as -1 | 0 | 1,
    ),
    null,
  );
});
