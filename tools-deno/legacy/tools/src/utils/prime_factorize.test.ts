import { assertEquals } from "@std/assert";
import { primeFactorize } from "./prime_factorize.ts";

Deno.test("primeFactorize tests", () => {
  assertEquals(primeFactorize(-10), {});
  assertEquals(primeFactorize(1), {});
  assertEquals(primeFactorize(7), { 7: 1 });
  assertEquals(primeFactorize(100), { 2: 2, 5: 2 });
});
