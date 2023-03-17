import { describe, expect, it } from 'vitest';
import {
  areDatesEqual,
  isDateAfter,
  isDateAfterOrEqual,
  isDateBefore,
  isDateBeforeOrEqual,
} from './dateTimeComparison';

describe('Helpers > DateTimeUtils', () => {
  it('should have a function to check if 2 dates are same', () => {
    const date1 = new Date();
    const date2 = new Date();
    expect(areDatesEqual(date1, date2)).toBe(true);
  });

  it('should have a function to check if 1 date is before other', () => {
    const date1 = new Date();
    const date2 = new Date(Date.now() + 123);
    expect(isDateBefore(date1, date2)).toBe(true);
  });

  it('should have a function to check if 1 date isDateBeforeOrEqual to other', () => {
    const date1 = new Date();
    const date2 = new Date(Date.now() + 123);
    expect(isDateBeforeOrEqual(date1, date2)).toBe(true);
  });

  it('should have a function to check if 1 date is after other', () => {
    const date1 = new Date(Date.now() + 123);
    const date2 = new Date();
    expect(isDateAfter(date1, date2)).toBe(true);
  });

  it('should have a function to check if 1 date is isDateAfterOrEqual to other', () => {
    const date1 = new Date(Date.now() + 123);
    const date2 = new Date();
    expect(isDateAfterOrEqual(date1, date2)).toBe(true);
  });
});
