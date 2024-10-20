import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { OutputBuffer } from "@/models/OutputBuffer";
// prettier-ignore
import {
  LoopWhileExpressionIsTrueParser,
} from "@/parsers/block-parsers/loop-parsers/loop-while-expression-is-true-parser";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the functionality of loop while expression is true parser.", () => {
  let linesOfCode: LineOfCode[];
  let scope: Scope;
  let parser: LoopWhileExpressionIsTrueParser;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
    parser = new LoopWhileExpressionIsTrueParser(linesOfCode, scope);

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "x",
      "number",
      0,
      false,
      scope,
    );
    variableBlock.execute();
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test("should print something while expression is true", () => {
    addLineOfCode("loop  while x < 10:");
    addLineOfCode("    display x");
    addLineOfCode("    set x to x + 1");
    linesOfCode.reverse();

    const block = parser.parse();
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n");
  });
});
