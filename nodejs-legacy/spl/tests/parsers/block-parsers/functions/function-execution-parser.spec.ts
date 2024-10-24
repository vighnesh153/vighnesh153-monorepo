import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { Interpreter } from "@/interpreter";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of the function-execution parser", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should execute the function.", () => {
    addLineOfCode(
      "define function doIt with arguments [] which returns number:",
    );
    addLineOfCode("    display 123");
    addLineOfCode("    display 456");
    addLineOfCode("    return 789");
    addLineOfCode("execute doIt()");
    linesOfCode.reverse();

    new Interpreter(linesOfCode, scope).interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("123\n456\n");
  });
});
