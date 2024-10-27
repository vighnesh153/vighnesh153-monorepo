import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { LoopForXTimes } from "@/blocks/loop-blocks/loop-for-x-times";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of loop for x times", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let block: LoopForXTimes;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should print something for n number of times", () => {
    addLineOfCode(`    display 'Hello'`);

    block = new LoopForXTimes(3, scope, linesOfCode);
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("Hello\nHello\nHello\n");
  });

  test("should have the counter variable inside the variable", () => {
    addLineOfCode("    display i + 100");

    block = new LoopForXTimes(3, scope, linesOfCode, "i");
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("101\n102\n103\n");
  });
});
