import { assertEquals } from "@std/assert";
import { milliseconds } from "./milliseconds.ts";

Deno.test("milliseconds tests", () => {
  assertEquals(milliseconds(123), 123);
  assertEquals(milliseconds({ seconds: 10 }), 10000);
  assertEquals(milliseconds({ minutes: 20 }), 20 * 60 * 1000);
  assertEquals(milliseconds({ hours: 30 }), 30 * 60 * 60 * 1000);
  assertEquals(milliseconds({ days: 5 }), 5 * 24 * 60 * 60 * 1000);
  assertEquals(milliseconds({ weeks: 3 }), 3 * 7 * 24 * 60 * 60 * 1000);
  assertEquals(milliseconds({ years: 5 }), 5 * 365 * 24 * 60 * 60 * 1000);
  assertEquals(milliseconds({ leapYears: 2 }), 2 * 366 * 24 * 60 * 60 * 1000);
});
