const identifierRegex = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

export const isValidIdentifier = (text: string) => {
  return identifierRegex.test(text.trim());
};
