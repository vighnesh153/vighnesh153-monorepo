import { assertEquals } from "@std/assert";
import { isPrime } from "./is_prime.ts";

Deno.test("isPrime tests", () => {
  assertEquals(isPrime(1.5), false);
  assertEquals(isPrime(-2), false);
  assertEquals(isPrime(1), false);
  assertEquals(isPrime(3), true);
  assertEquals(isPrime(42), false);
  assertEquals(isPrime(97), true);
  assertEquals(isPrime(437), false);
  assertEquals(isPrime(899), false);
});
