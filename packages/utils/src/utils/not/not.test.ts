import { describe, expect, it } from 'vitest';
import { not } from './not';

describe('Helpers > not tests', () => {
  it('should return true if null or undefined is provided', () => {
    expect(not(null)).toBe(true);
    expect(not(undefined)).toBe(true);
  });

  it('should return true if false is provided', () => {
    expect(not(false)).toBe(true);
  });

  it('should return false if true is provided', () => {
    expect(not(true)).toBe(false);
  });
});
