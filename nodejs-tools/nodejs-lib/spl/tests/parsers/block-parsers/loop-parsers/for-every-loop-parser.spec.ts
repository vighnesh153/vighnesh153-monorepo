import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { ForEveryLoopParser } from "@/parsers/block-parsers/loop-parsers/for-every-loop-parser";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of the for every loop parser", () => {
  let linesOfCode: LineOfCode[];
  let scope: Scope;
  let parser: ForEveryLoopParser;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
    parser = new ForEveryLoopParser(linesOfCode, scope);
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should run the loop for every item in the array", () => {
    addLineOfCode("for every elem in [1 ,2 , 3, 4 + 5]:");
    addLineOfCode("    display elem");
    addLineOfCode("    display elem + 10");
    linesOfCode.reverse();

    parser.parse().execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n11\n2\n12\n3\n13\n9\n19\n");
  });

  test("should run the loop for every item in the array with index set", () => {
    addLineOfCode("for every elem in [1 ,2 , 3, 4 + 5] with ii as index:");
    addLineOfCode("    display elem");
    addLineOfCode("    display elem + ii");
    linesOfCode.reverse();

    parser.parse().execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n1\n2\n3\n3\n5\n9\n12\n");
  });
});
