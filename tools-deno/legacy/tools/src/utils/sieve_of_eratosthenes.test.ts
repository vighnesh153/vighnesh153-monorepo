import { assertEquals } from "@std/assert";
import { sieveOfEratosthenes } from "./sieve_of_eratosthenes.ts";

Deno.test("sieveOfEratosthenes should return empty array if limit is negative number", () => {
  assertEquals(sieveOfEratosthenes(-10), []);
});

Deno.test("sieveOfEratosthenes should return correct list of primes for a non-prime limit", () => {
  assertEquals(sieveOfEratosthenes(10), [2, 3, 5, 7]);
});

Deno.test("sieveOfEratosthenes should return correct list of primes for a prime limit", () => {
  assertEquals(sieveOfEratosthenes(13), [2, 3, 5, 7, 11, 13]);
});
