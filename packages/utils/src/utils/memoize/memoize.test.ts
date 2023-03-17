import { describe, expect, it, vi } from 'vitest';
import { memoize } from './memoize';

describe('Helpers > memoize tests', () => {
  it('should not invoke function twice', () => {
    const add = vi.fn((a: number, b: string) => a + b);
    const memoizedAdd = memoize(add);

    const invoke = () => memoizedAdd(1, 'a');
    const expectedReturnValue = '1a';

    // Should return same result always
    expect(invoke()).toBe(expectedReturnValue);
    expect(invoke()).toBe(expectedReturnValue);
    expect(invoke()).toBe(expectedReturnValue);

    // Should have only invoked "add" once
    expect(add).toHaveBeenCalledTimes(1);
  });

  it('should support memoization for function which accepts complex objects', () => {
    const sampleFn = vi.fn((map: Map<number, number>) => Array.from(map.values()));

    const memoizedSampleFn = memoize(sampleFn, (map) => JSON.stringify(Array.from(map.entries())));

    const map = new Map([
      [1, 1],
      [2, 4],
      [3, 9],
    ]);

    // Should return same result for same argument
    expect(memoizedSampleFn(map)).toStrictEqual([1, 4, 9]);
    expect(memoizedSampleFn(map)).toStrictEqual([1, 4, 9]);

    // If called with same argument, it should invoke the original
    // function only once
    expect(sampleFn).toBeCalledTimes(1);

    map.set(4, 16);

    // Argument has changed and hence, it should invoke it again.
    expect(memoizedSampleFn(map)).toStrictEqual([1, 4, 9, 16]);
    expect(memoizedSampleFn(map)).toStrictEqual([1, 4, 9, 16]);

    expect(sampleFn).toBeCalledTimes(2);
  });
});
