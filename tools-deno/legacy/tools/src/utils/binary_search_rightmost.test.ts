import { assertEquals } from "@std/assert/equals";
import { binarySearchRightmost } from "./binary_search_rightmost.ts";

Deno.test("Binary search rightmost on simple array", () => {
  assertEquals(binarySearchRightmost([1, 2, 4, 5, 10], 5), 3);
  assertEquals(binarySearchRightmost([1, 2, 2, 2, 2], 2), 4);
  assertEquals(binarySearchRightmost([1, 2, 2, 2, 2], 1), 0);
  assertEquals(
    binarySearchRightmost([1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5], 5),
    11,
  );
  assertEquals(binarySearchRightmost([1, 2, 2, 2, 2], 99), null);
});

Deno.test("Binary search rightmost with custom operator", () => {
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
    binarySearchRightmost(
      pokemon,
      { name: "Pikachu", type: "electric" },
      (p1, p2) => p1.name.localeCompare(p2.name) as -1 | 0 | 1,
    ),
    8,
  );

  assertEquals(
    binarySearchRightmost(
      pokemon,
      { name: "dragonite", type: "dragon" },
      (p1, p2) => p1.name.localeCompare(p2.name) as -1 | 0 | 1,
    ),
    null,
  );
});
