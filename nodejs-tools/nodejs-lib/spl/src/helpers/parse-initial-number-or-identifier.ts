const isValid = (text: string): boolean => {
  return /^\s*[_.a-zA-Z0-9*+\-/%()[\]]*$/.test(text);
};

export const parseInitialNumberOrIdentifier = (text: string): string => {
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
