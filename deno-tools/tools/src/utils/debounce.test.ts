import { FakeTime } from "@std/testing/time";
import { assertSpyCalls, stub } from "@std/testing/mock";
import { debounce } from "./debounce.ts";

Deno.test("debounce should invoke the function after debounce delay", () => {
  using time = new FakeTime();
  const holder = { func() {} };
  const funcStub = stub(holder, "func");
  const debounceTime = 1000;
  const debouncedFn = debounce(holder.func, debounceTime);

  debouncedFn();

  assertSpyCalls(funcStub, 0);

  // Adding 10ms as buffer
  time.tick(debounceTime + 10);

  assertSpyCalls(funcStub, 1);
});

Deno.test("debounce should invoke the function only once if called repeatedly", () => {
  using time = new FakeTime();
  const holder = { func() {} };
  const funcStub = stub(holder, "func");
  const debounceTime = 1000;
  const debouncedFn = debounce(holder.func, debounceTime);

  debouncedFn();
  debouncedFn();
  debouncedFn();

  assertSpyCalls(funcStub, 0);

  // Adding 10ms as buffer
  time.tick(debounceTime + 10);

  assertSpyCalls(funcStub, 1);
});

Deno.test("debounce should invoke the function again if the previous invoke completed", () => {
  using time = new FakeTime();
  const holder = { func() {} };
  const funcStub = stub(holder, "func");
  const debounceTime = 1000;
  const debouncedFn = debounce(holder.func, debounceTime);

  debouncedFn();
  debouncedFn();
  debouncedFn();

  assertSpyCalls(funcStub, 0);

  // Adding 10ms as buffer
  time.tick(debounceTime + 10);

  assertSpyCalls(funcStub, 1);

  debouncedFn();
  debouncedFn();

  // Adding 10ms as buffer
  time.tick(debounceTime + 10);

  assertSpyCalls(funcStub, 2);
});
