import { assertStrictEquals } from "@std/assert";
import { sieveOfEratosthenes } from "./sieve_of_eratosthenes.ts";

Deno.test("sieveOfEratosthenes should return empty array if limit is negative number", () => {
  assertStrictEquals(sieveOfEratosthenes(-10), []);
});

Deno.test("sieveOfEratosthenes should return correct list of primes for a non-prime limit", () => {
  assertStrictEquals(sieveOfEratosthenes(10), [2, 3, 5, 7]);
});

Deno.test("sieveOfEratosthenes should return correct list of primes for a prime limit", () => {
  assertStrictEquals(sieveOfEratosthenes(13), [2, 3, 5, 7, 11, 13]);
});
