export function classes(...classList: (string | null | undefined)[]): string {
  return classList
    .filter((cls) => !!cls)
    .map((cls) => cls!.replaceAll(/[\n \t]+/g, ' '))
    .join(' ')
    .trim();
}
