import { assertStrictEquals } from "@std/assert";
import { primeFactorize } from "./prime_factorize.ts";

Deno.test("primeFactorize tests", () => {
  assertStrictEquals(primeFactorize(-10), {});
  assertStrictEquals(primeFactorize(1), {});
  assertStrictEquals(primeFactorize(7), { 7: 1 });
  assertStrictEquals(primeFactorize(100), { 2: 2, 5: 2 });
});
