/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { SubtractionEvaluator } from "@/expression-evaluators/arithmetic-expressions/subtraction-evaluator";

describe("check the tryEvaluate functionality of subtraction evaluator.", () => {
  let scope: Scope;
  let subtractionEvaluator: SubtractionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    subtractionEvaluator = new SubtractionEvaluator(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = subtractionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid subtraction expression.", () => {
    const input = "- 2";
    const result = subtractionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid subtraction expression.", () => {
    const input = "1 - 2";
    const result = subtractionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of subtraction evaluator.", () => {
  let scope: Scope;
  let subtractionEvaluator: SubtractionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    subtractionEvaluator = new SubtractionEvaluator(scope);
  });

  test("should subtract positive numbers.", () => {
    const input = " 2 - 56";
    const result = subtractionEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("-54");
  });

  test("should subtract negative numbers.", () => {
    const input = " -2 - -56";
    const result = subtractionEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("54");
  });

  test("should subtract number from variable.", () => {
    const input = " someVariable1 - -100";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "number",
      101,
      true,
      scope,
    );
    variableBlock.execute();

    const result = subtractionEvaluator.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("201");
  });
});
