import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { ForEveryLoop } from "@/blocks/loop-blocks/for-every-loop";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { ArrayVariableBlock } from "@/blocks/variable-blocks/array-variable-block";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of the for-every loop.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let block: ForEveryLoop;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
  });

  const setVariable = (name: string, type: string, value: unknown) => {
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      name,
      type,
      value,
      false,
      scope,
    );
    variableBlock.execute();
  };

  const setArray = (name: string, type: string, value: unknown) => {
    const variableBlock = new ArrayVariableBlock(
      VariableBlockType.declare,
      name,
      "array",
      value,
      false,
      scope,
      type,
    );
    variableBlock.execute();
  };

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test(`should throw if variable doesn't exist`, () => {
    expect(() => {
      block = new ForEveryLoop("element", scope, linesOfCode, "arr");
    }).toThrow();
  });

  test(`should throw if variable isn't an array`, () => {
    setVariable("arr", "string", "Hello.");
    expect(() => {
      block = new ForEveryLoop("element", scope, linesOfCode, "arr");
    }).toThrow();
  });

  test("should run the loop for every item", () => {
    setArray("arr", "number", [5, 10, 15, 20, 25]);

    addLineOfCode("    display element + 1");

    block = new ForEveryLoop("element", scope, linesOfCode, "arr");
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("6\n11\n16\n21\n26\n");
  });

  test("should run the loop for every item and also have access to index", () => {
    setArray("arr", "number", [5, 10, 15, 20, 25]);

    addLineOfCode("    display element + 1 + i");

    block = new ForEveryLoop("element", scope, linesOfCode, "arr", "i");
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("6\n12\n18\n24\n30\n");
  });
});
