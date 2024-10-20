import { FunctionDefinitionBlockParser } from "@/parsers/block-parsers/functions/function-definition-block-parser";
import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";

describe("check the functionality of function definition block parser.", () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  it("should define a function.", () => {
    addLineOfCode(
      "define function func with arguments [] which returns nothing:",
    );
    // eslint-disable-next-line quotes
    addLineOfCode("    display 'Hello'");
    linesOfCode.reverse();

    const parser = new FunctionDefinitionBlockParser(scope, linesOfCode);
    const block = parser.parse();
    block.execute();

    expect(scope.hasFunction("func")).toStrictEqual(true);
  });
});
