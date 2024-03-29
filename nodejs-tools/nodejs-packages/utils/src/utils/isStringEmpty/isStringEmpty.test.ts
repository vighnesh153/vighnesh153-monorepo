import { describe, expect, it } from 'vitest';
import { isStringEmpty } from './isStringEmpty';

describe('"isStringEmpty" tests', () => {
  it('should return true if "undefined" is passed', () => {
    expect(isStringEmpty()).toBe(true);
    expect(isStringEmpty(undefined)).toBe(true);
  });

  it('should return true if "null" is passed', () => {
    expect(isStringEmpty(null)).toBe(true);
  });

  it('should return true if "" is passed', () => {
    expect(isStringEmpty('')).toBe(true);
  });

  it('should return true if whitespaces are passed', () => {
    expect(isStringEmpty('    ')).toBe(true);
  });

  it('should return false if a non-empty string is passed', () => {
    expect(isStringEmpty('Pikachu is love ❤️')).toBe(false);
  });
});
