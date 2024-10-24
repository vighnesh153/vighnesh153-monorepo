import { LineOfCode } from "@/models/LineOfCode";

const whiteSpaceConvert: { [key: string]: string } = {
  "\t": "    ",
  " ": " ",
};

export const initialWhitespaceConverter = (
  effectiveLinesOfCode: LineOfCode[],
): LineOfCode[] => {
  const convertedLines: LineOfCode[] = [];

  effectiveLinesOfCode.forEach((line) => {
    const convertedFragments = [];

    for (let i = 0; i < line.value.length; i++) {
      // as soon as we encounter a non-whitespace character,
      // we break out with the remaining segment
      if (["\t", " "].includes(line.value[i]) === false) {
        convertedFragments.push(line.value.substring(i));
        break;
      }
      convertedFragments.push(whiteSpaceConvert[line.value[i]]);
    }

    const convertedLineValue = convertedFragments.join("");
    const convertedLine = new LineOfCode(convertedLineValue, line.number);
    convertedLines.push(convertedLine);
  });

  return convertedLines;
};
