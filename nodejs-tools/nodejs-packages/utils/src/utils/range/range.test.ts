import { describe, expect, it } from 'vitest';
import { range } from './range';

describe('"range" tests', () => {
  it('should throw error if step is 0', () => {
    expect(() => Array.from(range(1, 10, 0))).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"step\\" to be non-zero, found \\"0\\""`
    );
  });

  it('should throw error if start < end and step < 0', () => {
    expect(() => Array.from(range(1, 10, -2))).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"step\\" to be positive if \\"start\\" is less than \\"end\\""`
    );
  });

  it('should throw error if start > end and step > 0', () => {
    expect(() => Array.from(range(100, 10, 2))).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"step\\" to be negative if \\"start\\" is greater than \\"end\\""`
    );
  });

  it('should return a generator of numbers from 1 to 3', () => {
    const r = range(1, 3);

    let next = r.next();
    expect(next.done).toBe(false);
    expect(next.value).toBe(1);

    next = r.next();
    expect(next.done).toBe(false);
    expect(next.value).toBe(2);

    next = r.next();
    expect(next.done).toBe(false);
    expect(next.value).toBe(3);

    next = r.next();
    expect(next.done).toBe(true);
    expect(next.value).toBe(undefined);
  });

  it('should support steps of 2', () => {
    const r = range(1, 10, 2);

    expect(Array.from(r)).toStrictEqual([1, 3, 5, 7, 9]);
  });

  it('should support negative steps', () => {
    const r = range(3, 1, -1);

    expect(Array.from(r)).toStrictEqual([3, 2, 1]);
  });
});
