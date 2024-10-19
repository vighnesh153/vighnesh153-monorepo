import { assertEquals } from "@std/assert";
import { nextPrime } from "./next_prime.ts";

Deno.test("nextPrime tests", () => {
  assertEquals(nextPrime(2), 3);
  assertEquals(nextPrime(3), 5);
  assertEquals(nextPrime(7.5), 11);
  assertEquals(nextPrime(15), 17);
});
