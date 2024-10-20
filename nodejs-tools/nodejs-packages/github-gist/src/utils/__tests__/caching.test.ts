import { beforeEach, describe, expect, it } from "vitest";

import { randomUuid } from "@vighnesh153/tools";
import { getCache, resetCache, setCache } from "../caching.ts";

describe('Helpers > "caching" tests', () => {
  const key = randomUuid();
  const value = randomUuid();

  beforeEach(() => {
    resetCache();
  });

  it("should return null if querying for the first time", () => {
    expect(getCache(key)).toBeNull();
  });

  it("should return the cached value if present", () => {
    expect(getCache(key)).toBeNull();
    setCache(key, value);
    expect(getCache(key)).toBe(value);
  });

  it("should allow to reset the cache", () => {
    setCache(key, value);
    expect(getCache(key)).toBe(value);
    resetCache([key]);
    expect(getCache(key)).toBeNull();
  });

  it("should allow to delete only specific keys", () => {
    const key1 = randomUuid();
    const key2 = randomUuid();
    const key3 = randomUuid();

    const value1 = randomUuid();
    const value2 = randomUuid();
    const value3 = randomUuid();

    setCache(key1, value1);
    setCache(key2, value2);
    setCache(key3, value3);

    expect(getCache(key1)).toBe(value1);
    expect(getCache(key2)).toBe(value2);
    expect(getCache(key3)).toBe(value3);

    resetCache([key1, key3]);

    expect(getCache(key1)).toBeNull();
    expect(getCache(key2)).toBe(value2);
    expect(getCache(key3)).toBeNull();
  });
});
