const isValid = (text: string) => {
  return /^\s*[_a-zA-Z0-9]*$/.test(text);
};

export const parseInitialBooleanOrIdentifier = (text: string): string => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const subString = text.slice(0, i + 1);
    if (isValid(subString)) {
      result = subString;
    } else {
      break;
    }
  }
  return result;
};
