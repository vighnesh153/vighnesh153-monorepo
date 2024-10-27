import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { LoopForXTimesParser } from "@/parsers/block-parsers/loop-parsers/loop-for-x-times-parser";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of loop for x times parser.", () => {
  let linesOfCode: LineOfCode[];
  let scope: Scope;
  let parser: LoopForXTimesParser;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
    parser = new LoopForXTimesParser(linesOfCode, scope);
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should print something for n number of times", () => {
    addLineOfCode("loop  for   4 times:");
    addLineOfCode("    display 'Hello'");
    linesOfCode.reverse();

    const block = parser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("Hello\nHello\nHello\nHello\n");
  });

  test("should have the counter variable inside the variable", () => {
    addLineOfCode("loop   for 4   times with i as  counter:");
    addLineOfCode("    display  i + 1000");
    linesOfCode.reverse();

    const block = parser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1001\n1002\n1003\n1004\n");
  });
});
