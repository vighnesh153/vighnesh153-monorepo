import { not } from "./not.ts";

/**
 * Generates the factorial of a number
 *
 * @param n - find factorial of this number
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial of negative numbers is not defined");
  }
  if (not(Number.isInteger(n))) {
    throw new Error("Factorial of fractional numbers is not defined");
  }

  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
