/* eslint-disable quotes */
import { ConditionalBlockParser } from "@/parsers/block-parsers/conditional-block-parser";
import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the tryParse functionality of conditional parser.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let blockParser: ConditionalBlockParser;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
    blockParser = new ConditionalBlockParser(linesOfCode, scope);
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should return false if statement doesn't have proper indentation.", () => {
    addLineOfCode(" if 1 < 2, then do:");
    addLineOfCode("    display 'From the if block'");
    linesOfCode.reverse();

    expect(blockParser.tryParse()).toStrictEqual(false);
  });

  test("should return false if statement has some missing punctuation.", () => {
    addLineOfCode("if 1 < 2 then do:");
    addLineOfCode("    display 'From the if block'");
    linesOfCode.reverse();

    expect(blockParser.tryParse()).toStrictEqual(false);
  });
});

describe("check the error handling functionality of conditional parser.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let blockParser: ConditionalBlockParser;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
    blockParser = new ConditionalBlockParser(linesOfCode, scope);
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should throw if the if condition has a missing block.", () => {
    addLineOfCode("if 1 < 2, then do:");
    addLineOfCode("else if 2 < 3, then do:");
    addLineOfCode("    display 'From the else if block'");
    addLineOfCode("else, do:");
    addLineOfCode("    display 'From the else block'");
    linesOfCode.reverse();

    expect(() => {
      blockParser.parse();
    }).toThrow();
  });

  test("should throw if the else if condition has a missing block.", () => {
    addLineOfCode("if 1 < 2, then do:");
    addLineOfCode("    display 'From the if block'");
    addLineOfCode("else if 2 < 3, then do:");
    addLineOfCode("else, do:");
    addLineOfCode("    display 'From the else block'");
    linesOfCode.reverse();

    expect(() => {
      blockParser.parse();
    }).toThrow();
  });

  test("should throw if the else condition has a missing block.", () => {
    addLineOfCode("if 1 < 2, then do:");
    addLineOfCode("    display 'From the if block'");
    addLineOfCode("else if 2 < 3, then do:");
    addLineOfCode("    display 'From the else if block'");
    addLineOfCode("else, do:");
    linesOfCode.reverse();

    expect(() => {
      blockParser.parse();
    }).toThrow();
  });
});

describe("check the conditional block parsing functionality.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let blockParser: ConditionalBlockParser;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
    blockParser = new ConditionalBlockParser(linesOfCode, scope);
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test(
    "should display from the if block, " + "if the if block is true.",
    () => {
      addLineOfCode("if 1 < 2, then do:");
      addLineOfCode("    display 'From the if block'");
      addLineOfCode("else if 2 < 3, then do:");
      addLineOfCode("    display 'From the else if block'");
      addLineOfCode("else, do:");
      addLineOfCode("    display 'From the else block'");
      linesOfCode.reverse();

      const block = blockParser.parse();
      block.execute();

      const result = OutputBuffer.instance.getAndFlush();
      expect(result).toStrictEqual("From the if block\n");
    },
  );

  test(
    "should display from the else if block, " + "if the else if block is true.",
    () => {
      addLineOfCode("if 1 > 2, then do:");
      addLineOfCode("    display 'From the if block'");
      addLineOfCode("else if 2 < 3, then do:");
      addLineOfCode("    display 'From the else if block'");
      addLineOfCode("else, do:");
      addLineOfCode("    display 'From the else block'");
      linesOfCode.reverse();

      const block = blockParser.parse();
      block.execute();

      const result = OutputBuffer.instance.getAndFlush();
      expect(result).toStrictEqual("From the else if block\n");
    },
  );

  test(
    "should display from the else block, " +
      "if no other condition evaluates to true.",
    () => {
      addLineOfCode("if 1 > 2, then do:");
      addLineOfCode("    display 'From the if block'");
      addLineOfCode("else if 2 > 3, then do:");
      addLineOfCode("    display 'From the else if block'");
      addLineOfCode("else, do:");
      addLineOfCode("    display 'From the else block'");
      linesOfCode.reverse();

      const block = blockParser.parse();
      block.execute();

      const result = OutputBuffer.instance.getAndFlush();
      expect(result).toStrictEqual("From the else block\n");
    },
  );
});
