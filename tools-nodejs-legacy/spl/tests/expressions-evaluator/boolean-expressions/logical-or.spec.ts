import { Scope } from "@/models/Scope";
import { LogicalOr } from "@/expression-evaluators/boolean-expressions/logical-or";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of logical-and.", () => {
  let scope: Scope;
  let logicalOr: LogicalOr;
  beforeEach(() => {
    scope = new Scope();
    logicalOr = new LogicalOr(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = logicalOr.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid logical-or expression.", () => {
    const input = "1 >= 2";
    const result = logicalOr.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid logical-or expression.", () => {
    const input = "1 < 2 or 2 > 1";
    const result = logicalOr.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of logical or.", () => {
  let scope: Scope;
  let logicalOr: LogicalOr;
  beforeEach(() => {
    scope = new Scope();
    logicalOr = new LogicalOr(scope);
  });

  test("should return false for (false || false) input.", () => {
    const input = " false or false";
    const result = logicalOr.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("false");
  });

  test("should return true for (false || true) input.", () => {
    const input = "   false  or   true  ";
    const result = logicalOr.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });

  test("should compare variable numbers.", () => {
    const input = " someVariable1 or  false";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "boolean",
      true,
      true,
      scope,
    );
    variableBlock.execute();

    const result = logicalOr.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });
});
