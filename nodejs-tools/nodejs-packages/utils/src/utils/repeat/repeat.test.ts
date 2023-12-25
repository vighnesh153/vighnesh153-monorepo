import { describe, expect, it, vi } from 'vitest';
import { repeat } from './repeat';

describe('"repeat" tests', () => {
  it('should execute the callback, said number of times', () => {
    const count = Math.floor(Math.random() * 100);
    const dummyFunction = vi.fn();

    repeat(count, dummyFunction);

    expect(dummyFunction).toBeCalledTimes(count);
  });

  it('should execute the callback, with the count', () => {
    const count = 4;
    const dummyFunction = vi.fn();

    repeat(count, dummyFunction);

    expect(dummyFunction).toHaveBeenCalledTimes(count);
    for (let i = 1; i <= count; i++) {
      expect(dummyFunction).toHaveBeenNthCalledWith(i, i);
    }
  });
});
