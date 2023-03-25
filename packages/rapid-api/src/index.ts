export function add(...numbers: number[]): number {
  return numbers.reduce((sum, current) => sum + current, 0);
}
