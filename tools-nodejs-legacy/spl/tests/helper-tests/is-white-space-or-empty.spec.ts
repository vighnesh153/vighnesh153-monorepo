import { isWhiteSpaceOrEmpty } from "@/helpers/is-whitespace-or-empty";

describe("check isWhiteSpaceOrEmpty helper function.", () => {
  test("should return true for empty string.", () => {
    const actual = isWhiteSpaceOrEmpty("");
    expect(actual).toStrictEqual(true);
  });

  test("should return true for a space character.", () => {
    const actual = isWhiteSpaceOrEmpty(" ");
    expect(actual).toStrictEqual(true);
  });

  test("should return true for a tab character.", () => {
    const actual = isWhiteSpaceOrEmpty("\t");
    expect(actual).toStrictEqual(true);
  });

  test("should return true for a new-line character.", () => {
    const actual = isWhiteSpaceOrEmpty("\n");
    expect(actual).toStrictEqual(true);
  });

  test("should return true for a carriage-return character.", () => {
    const actual = isWhiteSpaceOrEmpty("\r");
    expect(actual).toStrictEqual(true);
  });

  test("should return false for a non-whitespace character.", () => {
    const actual = isWhiteSpaceOrEmpty("a");
    expect(actual).toStrictEqual(false);
  });

  test("should return false for a string having non-whitespace character.", () => {
    const actual = isWhiteSpaceOrEmpty("    \t\t   \n\n \ra");
    expect(actual).toStrictEqual(false);
  });

  test("should return true for mix of white-space characters.", () => {
    const actual = isWhiteSpaceOrEmpty("    \t\t   \n\n \r");
    expect(actual).toStrictEqual(true);
  });
});
