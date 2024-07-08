import { describe, expect, it } from 'vitest';
import { isEven } from './isEven';

describe('Math > isEven tests', () => {
  it('should return false if the number is odd', () => {
    const num = 69;
    expect(isEven(num)).toBe(false);
  });

  it('should return true if the number is even', () => {
    const num = 42;
    expect(isEven(num)).toBe(true);
  });
});
