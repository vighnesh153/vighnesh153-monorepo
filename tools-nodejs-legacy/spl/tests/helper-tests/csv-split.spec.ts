import { csvSplit } from "@/helpers/csv-split";

describe("check the functionality of csv-split.", () => {
  test("should return empty array if whitespace string is passed.", () => {
    const input = "   \n\n\n\n\n\n\n  \t\t\t\t\t\t       ";

    const result = csvSplit(input);
    expect(result).toStrictEqual([]);
  });

  test("should split comma separated numbers.", () => {
    const input = "   1    ,    2      ,     77      ";

    const result = csvSplit(input);
    expect(result).toStrictEqual(["1", "2", "77"]);
  });

  test("should split comma separated strings.", () => {
    const input =
      "   'Hello '   ,    ' LOL '      ,     ' This is so fun '      ";

    const result = csvSplit(input);
    expect(result).toStrictEqual(["'Hello '", "' LOL '", "' This is so fun '"]);
  });

  test("should split comma separated strings that are more complex.", () => {
    const input =
      "   'Hello, World! '   ,    ' LOL. ] OK OK '      ,     ' \" '      ";

    const result = csvSplit(input);
    expect(result).toStrictEqual([
      "'Hello, World! '",
      "' LOL. ] OK OK '",
      "' \" '",
    ]);
  });

  test("should split comma separated characters that have arrays and strings.", () => {
    const input =
      " 1  ,   2,   ['Hello, World', 34, '[Ok,('],  (lol, , ')' , ), 123 ";

    const result = csvSplit(input);
    expect(result).toStrictEqual([
      "1",
      "2",
      "['Hello, World', 34, '[Ok,(']",
      "(lol, , ')' , )",
      "123",
    ]);
  });
});
