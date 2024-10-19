import { assertSpyCalls, stub } from "@std/testing/mock";
import { assertEquals, assertStrictEquals } from "@std/assert";
import { memoize } from "./memoize.ts";

Deno.test("memoize should not invoke function twice", () => {
  const holder = { add: (a: number, b: string) => a + b };
  const mockedAdd = stub(holder, "add", (a, b) => a + b);
  const memoizedAdd = memoize(mockedAdd);

  // Should return same result always
  assertEquals(memoizedAdd(1, "a"), "1a");
  assertEquals(memoizedAdd(1, "a"), "1a");
  assertEquals(memoizedAdd(1, "a"), "1a");

  // Should have only invoked "add" once
  assertSpyCalls(mockedAdd, 1);
});

Deno.test("memoize should also memoize functions with complex object and custom serializer", () => {
  const holder = {
    func: (map: Map<number, number>) => Array.from(map.values()),
  };
  const mockedFunc = stub(
    holder,
    "func",
    (map: Map<number, number>) => Array.from(map.values()),
  );
  const memoizedFunc = memoize(
    mockedFunc,
    (map) => JSON.stringify(Array.from(map.entries()).toSorted()),
  );

  const buildMap = () => new Map([[1, 1], [2, 4], [3, 9]]);

  // Should return same result for same argument
  assertStrictEquals(memoizedFunc(buildMap()), [1, 4, 9]);
  assertStrictEquals(memoizedFunc(buildMap()), [1, 4, 9]);
  assertStrictEquals(memoizedFunc(buildMap()), [1, 4, 9]);

  // Should have only invoked "func" once
  assertSpyCalls(mockedFunc, 1);

  const buildMap2 = () => new Map([[1, 1], [2, 4], [3, 9], [4, 16]]);

  // Argument has changed and hence, it should invoke it again.
  assertStrictEquals(memoizedFunc(buildMap2()), [1, 4, 9, 16]);
  assertStrictEquals(memoizedFunc(buildMap2()), [1, 4, 9, 16]);

  assertSpyCalls(mockedFunc, 2);
});
