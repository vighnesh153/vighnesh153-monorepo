import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { FunctionBlock } from "@/blocks/function-block";
import { Interpreter } from "@/interpreter";

describe("check the functionality of function expression evalutor.", () => {
  let scope: Scope;
  beforeEach(() => {
    scope = new Scope();
  });

  test("should call the defined function.", () => {
    const functionBlock = new FunctionBlock(
      "add",
      ["number a", "number b"],
      [new LineOfCode("    return a + b", 1)],
      scope,
      true,
      "number",
    );
    FunctionBlock.define(functionBlock, scope);

    new Interpreter([
      new LineOfCode("let number abc be result of add(25, 26)", 2),
    ], scope).interpret();

    expect(scope.hasVariable("abc")).toStrictEqual(true);
    const variable = scope.getVariable("abc");
    expect(variable.value).toStrictEqual(51);
  });
});
