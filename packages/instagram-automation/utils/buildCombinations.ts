export const buildCombinations = (prompt: string, options: string[], replaceKey: string): string[] =>
  options.map((option) => prompt.replace(replaceKey, option));
