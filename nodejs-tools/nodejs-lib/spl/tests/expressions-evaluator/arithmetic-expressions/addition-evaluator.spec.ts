/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { AdditionEvaluator } from "@/expression-evaluators/arithmetic-expressions/addition-evaluator";

describe("check the tryEvaluate functionality of addition evaluator.", () => {
  let scope: Scope;
  let additionEvaluator: AdditionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    additionEvaluator = new AdditionEvaluator(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = additionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid addition expression.", () => {
    const input = "1 - 2";
    const result = additionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid addition expression.", () => {
    const input = "1 + 2";
    const result = additionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of addition evaluator.", () => {
  let scope: Scope;
  let additionEvaluator: AdditionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    additionEvaluator = new AdditionEvaluator(scope);
  });

  test("should add positive numbers.", () => {
    const input = " 2 + 56";
    const result = additionEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("58");
  });

  test("should add negative numbers.", () => {
    const input = " -2 + -56";
    const result = additionEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("-58");
  });

  test("should add number from variable.", () => {
    const input = " someVariable1 + -100";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "number",
      101,
      true,
      scope,
    );
    variableBlock.execute();

    const result = additionEvaluator.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("1");
  });
});
