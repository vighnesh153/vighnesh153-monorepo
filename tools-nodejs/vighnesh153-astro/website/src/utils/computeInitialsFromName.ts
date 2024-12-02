export function computeInitialsFromName(fullName: string): string {
  const names = fullName.trim().toUpperCase().split(" ");
  if (names.length === 0) {
    return "";
  }
  if (names.length === 1) {
    return names[0].slice(0, 2);
  }
  return `${names.at(0)![0]}${names.at(-1)![0]}`;
}
