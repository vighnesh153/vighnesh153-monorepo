import { assertEquals } from "@std/assert";
import { previousPrime } from "./previous_prime.ts";

Deno.test("previousPrime tests", () => {
  assertEquals(previousPrime(2), null);
  assertEquals(previousPrime(3), 2);
  assertEquals(previousPrime(7.5), 7);
  assertEquals(previousPrime(15), 13);
});
