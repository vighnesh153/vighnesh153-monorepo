type BuildIndentationSpaceConfig = {
  indentationLevel: number;
  indentation: number;
};

export function buildIndentationSpace(
  { indentationLevel, indentation }: BuildIndentationSpaceConfig,
): string {
  return Array.from({ length: indentationLevel * indentation })
    .map(() => " ")
    .join("");
}
