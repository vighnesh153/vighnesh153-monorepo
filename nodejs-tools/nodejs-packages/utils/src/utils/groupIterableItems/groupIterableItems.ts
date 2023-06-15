function validateGroupLength(groupLength: number): void {
  if (groupLength < 1 || groupLength % 1 !== 0) {
    throw new Error(`Expected "groupLength" to be an integer and at least "1", found "${groupLength}"`);
  }
}

/**
 * Groups characters from the string in lengths of groupLength
 * @param s
 * @param groupLength
 */
export function groupStringCharacters(s: string, groupLength = 1): Array<string> {
  validateGroupLength(groupLength);

  const partsOfS = [] as string[];
  Array.from(s).forEach((char) => {
    const lastEntry = partsOfS.at(-1);
    if (lastEntry && lastEntry.length < groupLength) {
      partsOfS[partsOfS.length - 1] = lastEntry + char;
    } else {
      partsOfS.push(char);
    }
  });
  return partsOfS;
}

/**
 * Groups items from the array in lengths of groupLength
 * @param array
 * @param groupLength
 */
export function groupArrayItems<T>(array: Array<T>, groupLength = 1): Array<Array<T>> {
  validateGroupLength(groupLength);

  const partsOfArray = [] as Array<Array<T>>;
  array.forEach((item) => {
    const lastEntry = partsOfArray.at(-1);
    if (lastEntry && lastEntry.length < groupLength) {
      partsOfArray[partsOfArray.length - 1] = lastEntry.concat(item);
    } else {
      partsOfArray.push([item]);
    }
  });
  return partsOfArray;
}
