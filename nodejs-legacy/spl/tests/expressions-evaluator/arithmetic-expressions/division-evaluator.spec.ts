import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { DivisionEvaluator } from "@/expression-evaluators/arithmetic-expressions/division-evaluator";

describe("check the tryEvaluate functionality of division evaluator.", () => {
  let scope: Scope;
  let divisionEvaluator: DivisionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    divisionEvaluator = new DivisionEvaluator(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = divisionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid division expression.", () => {
    const input = "1 - 2";
    const result = divisionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid division expression.", () => {
    const input = "15 /  -5";
    const result = divisionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of division evaluator.", () => {
  let scope: Scope;
  let divisionEvaluator: DivisionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    divisionEvaluator = new DivisionEvaluator(scope);
  });

  test("should divide positive numbers.", () => {
    const input = " 12 /  4";
    const result = divisionEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("3");
  });

  test("should divide negative numbers.", () => {
    const input = " -56  /  -2";
    const result = divisionEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("28");
  });

  test("should divide number from variable.", () => {
    const input = " someVariable1 / -8";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "number",
      16,
      true,
      scope,
    );
    variableBlock.execute();

    const result = divisionEvaluator.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("-2");
  });
});
