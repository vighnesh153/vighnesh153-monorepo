import { assertSpyCalls, stub } from "@std/testing/mock";
import { FakeTime } from "@std/testing/time";
import { sleep } from "./sleep.ts";

function flushPromises() {
  return Promise.resolve(setTimeout);
}

Deno.test("sleep test", async () => {
  using time = new FakeTime();

  const mockFn = stub({ func() {} } as const, "func");

  sleep(6000).then(mockFn);

  // after 0 ms
  assertSpyCalls(mockFn, 0);
  time.tick(2000);
  await flushPromises();

  // after 2000 ms
  assertSpyCalls(mockFn, 0);
  time.tick(2000);
  await flushPromises();

  // after 4000 ms
  assertSpyCalls(mockFn, 0);
  time.tick(3000);
  await flushPromises();

  // after 7000 ms
  assertSpyCalls(mockFn, 1);
});
