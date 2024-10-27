import { assertSpyCallArgs, assertSpyCalls, stub } from "@std/testing/mock";
import { repeat } from "./repeat.ts";

Deno.test("repeat should execute the callback, said number of times", () => {
  const count = Math.floor(Math.random() * 100);
  const dummyFunction = stub({ func() {} } as const, "func");

  repeat(count, dummyFunction);

  assertSpyCalls(dummyFunction, count);
});

Deno.test("repeat should execute the callback, with the count", () => {
  const count = 4;
  const dummyFunction = stub({ func() {} } as const, "func");

  repeat(count, dummyFunction);

  assertSpyCalls(dummyFunction, count);
  for (let i = 0; i < count; i++) {
    assertSpyCallArgs(dummyFunction, i, [i + 1]);
  }
});
