import { describe, expect, it } from 'vitest';
import { milliseconds } from './milliseconds';

describe('"milliseconds" tests', () => {
  it('should return the milliseconds', () => {
    expect(milliseconds(123)).toBe(123);
  });

  it('should convert seconds to milliseconds', () => {
    const seconds = 10;
    expect(milliseconds({ seconds })).toBe(seconds * 1000);
  });

  it('should convert minutes to milliseconds', () => {
    const minutes = 20;
    expect(milliseconds({ minutes })).toBe(minutes * 1000 * 60);
  });

  it('should convert hours to milliseconds', () => {
    const hours = 30;
    expect(milliseconds({ hours })).toBe(hours * 1000 * 60 * 60);
  });

  it('should convert days to milliseconds', () => {
    const days = 5;
    expect(milliseconds({ days })).toBe(days * 1000 * 60 * 60 * 24);
  });

  it('should convert weeks to milliseconds', () => {
    const weeks = 3;
    expect(milliseconds({ weeks })).toBe(weeks * 1000 * 60 * 60 * 24 * 7);
  });

  it('should convert years to milliseconds', () => {
    const years = 3;
    expect(milliseconds({ years })).toBe(years * 1000 * 60 * 60 * 24 * 365);
  });

  it('should convert leapYears to milliseconds', () => {
    const leapYears = 3;
    expect(milliseconds({ leapYears })).toBe(leapYears * 1000 * 60 * 60 * 24 * 366);
  });
});
