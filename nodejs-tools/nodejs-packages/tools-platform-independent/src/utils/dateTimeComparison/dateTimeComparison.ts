/**
 * Checks if both the dates are same
 *
 * @param date1
 * @param date2
 */
export function areDatesEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

/**
 * Checks if date1 is before date2
 *
 * @param date1
 * @param date2
 */
export function isDateBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

/**
 * Checks if date1 is on or before date2
 *
 * @param date1
 * @param date2
 */
export function isDateBeforeOrEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() <= date2.getTime();
}

/**
 * Checks if date1 is after date2
 *
 * @param date1
 * @param date2
 */
export function isDateAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

/**
 * Checks if date1 is on or after date2
 *
 * @param date1
 * @param date2
 */
export function isDateAfterOrEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() >= date2.getTime();
}
