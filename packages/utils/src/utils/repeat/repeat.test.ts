import { describe, expect, it, vi } from 'vitest';
import { repeat } from './repeat';

describe('"repeat" tests', () => {
  it('should execute the callback, said number of times', () => {
    const count = Math.floor(Math.random() * 100);
    const dummyFunction = vi.fn();

    repeat(count, dummyFunction);

    expect(dummyFunction).toBeCalledTimes(count);
  });
});
