export function classes(
  ...classList: (string | null | boolean | undefined)[]
): string {
  return classList
    .filter((cls) => typeof cls === "string")
    .map((cls) => cls!.replaceAll(/[\n \t]+/g, " "))
    .join(" ")
    .trim();
}
