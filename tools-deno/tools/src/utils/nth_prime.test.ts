import { assertEquals, assertThrows } from "@std/assert";
import { nthPrime } from "./nth_prime.ts";

Deno.test("nthPrime tests", () => {
  assertThrows(() => nthPrime(-2), Error, '"n" needs to be a positive integer');
  assertThrows(
    () => nthPrime(5.5),
    Error,
    '"n" needs to be a positive integer',
  );

  assertEquals(nthPrime(1), 2);
  assertEquals(nthPrime(4), 7);
  assertEquals(nthPrime(10), 29);
});
