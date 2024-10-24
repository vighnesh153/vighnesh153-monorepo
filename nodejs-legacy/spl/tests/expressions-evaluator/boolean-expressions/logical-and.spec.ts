import { Scope } from "@/models/Scope";
import { LogicalAnd } from "@/expression-evaluators/boolean-expressions/logical-and";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of logical-and.", () => {
  let scope: Scope;
  let logicalAnd: LogicalAnd;
  beforeEach(() => {
    scope = new Scope();
    logicalAnd = new LogicalAnd(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = logicalAnd.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid logical-and expression.", () => {
    const input = "1 >= 2";
    const result = logicalAnd.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid logical-and expression.", () => {
    const input = "1 < 2 and 2 > 1";
    const result = logicalAnd.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of logical and.", () => {
  let scope: Scope;
  let logicalAnd: LogicalAnd;
  beforeEach(() => {
    scope = new Scope();
    logicalAnd = new LogicalAnd(scope);
  });

  test("should return false for (false && true) input.", () => {
    const input = " false and true";
    const result = logicalAnd.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("false");
  });

  test("should return true for (true && true) input.", () => {
    const input = "   true  and   true  ";
    const result = logicalAnd.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });

  test("should compare variable numbers.", () => {
    const input = " someVariable1 and  true";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "boolean",
      true,
      true,
      scope,
    );
    variableBlock.execute();

    const result = logicalAnd.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });
});
