import { FunctionBlock } from "@/blocks/function-block";
import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check if the function block can execute statements.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let block: FunctionBlock;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];

    block = new FunctionBlock("testFunc", [], linesOfCode, scope, false, "");
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should execute the child lines of code.", () => {
    addLineOfCode("    display 'Hello'");

    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("Hello\n");
  });
});

describe("check if the function block can use values of arguments.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let block: FunctionBlock;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];

    block = new FunctionBlock(
      "testFunc",
      ["string name", "array of number numbers"],
      linesOfCode,
      scope,
      false,
      "",
    );
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should execute the child lines of code.", () => {
    addLineOfCode("    display 'Hello'");
    addLineOfCode("    for every num in numbers:");
    addLineOfCode("        display name, ', ', num");
    linesOfCode.reverse();

    block.argv = ["'vighnesh153'", "[1 ,22 , 30 + 3, 50 - 6, 11 * 5 ]"];
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual(
      "Hello\n" +
        "vighnesh153, 1\n" +
        "vighnesh153, 22\n" +
        "vighnesh153, 33\n" +
        "vighnesh153, 44\n" +
        "vighnesh153, 55\n",
    );
  });

  test("should stop code execution if returned.", () => {
    addLineOfCode("    display 'Hello'");
    addLineOfCode("    for every num in numbers:");
    addLineOfCode("        display name, ', ', num");
    addLineOfCode("        if num > 70, then do:");
    addLineOfCode("            return");
    linesOfCode.reverse();

    block.argv = [
      "'vighnesh153'",
      "[1 ,22 , 30 + 3, 50 - 6, 11 * 5, 66, 77, 88, 99 ]",
    ];
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual(
      "Hello\n" +
        "vighnesh153, 1\n" +
        "vighnesh153, 22\n" +
        "vighnesh153, 33\n" +
        "vighnesh153, 44\n" +
        "vighnesh153, 55\n" +
        "vighnesh153, 66\n" +
        "vighnesh153, 77\n",
    );
  });
});

describe("check if the function block can return correct result.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let block: FunctionBlock;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];

    block = new FunctionBlock(
      "testFunc",
      ["string name", "array of number numbers"],
      linesOfCode,
      scope,
      true,
      "number",
    );
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should stop code execution if returned.", () => {
    addLineOfCode("    display 'Hello'");
    addLineOfCode("    for every num in numbers:");
    addLineOfCode("        display name, ', ', num");
    addLineOfCode("        if num > 70, then do:");
    addLineOfCode("            return num + 101");
    linesOfCode.reverse();

    block.argv = [
      "'vighnesh153'",
      "[1 ,22 , 30 + 3, 50 - 6, 11 * 5, 66, 77, 88, 99 ]",
    ];
    block.execute();

    const returnedResult = block.getResult();
    expect(returnedResult.value).toStrictEqual(178);

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual(
      "Hello\n" +
        "vighnesh153, 1\n" +
        "vighnesh153, 22\n" +
        "vighnesh153, 33\n" +
        "vighnesh153, 44\n" +
        "vighnesh153, 55\n" +
        "vighnesh153, 66\n" +
        "vighnesh153, 77\n",
    );
  });
});
