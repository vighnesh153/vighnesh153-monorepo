export function add(...numbers: number[]): number {
  return numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}
