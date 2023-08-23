export function createId(): string {
  return Math.random().toString(16).slice(2);
}
