/**
 * Checks if the string is empty or nullish
 *
 * @param s actual string
 * @param isWhiteSpaceEmpty whether to consider white spaces as empty
 */
export function isStringEmpty(
  s?: string | null | undefined,
  isWhiteSpaceEmpty = true,
): s is string {
  if (s == null) {
    return true;
  }
  return (isWhiteSpaceEmpty ? s.trim() : s).length === 0;
}
