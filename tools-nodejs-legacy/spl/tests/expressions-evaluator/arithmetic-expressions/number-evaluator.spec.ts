import { NumberEvaluator } from "@/expression-evaluators/arithmetic-expressions/number-evaluator";
import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of number evaluator.", () => {
  let scope: Scope;
  let numberEvaluator: NumberEvaluator;
  beforeEach(() => {
    scope = new Scope();
    numberEvaluator = new NumberEvaluator(scope);
  });

  test("should return false if in-valid numbers are passed.", () => {
    expect(numberEvaluator.tryEvaluate("")).toStrictEqual(false);
    expect(numberEvaluator.tryEvaluate(" 'Hello'  ")).toStrictEqual(false);
    expect(numberEvaluator.tryEvaluate("true   ")).toStrictEqual(false);
    expect(numberEvaluator.tryEvaluate("  ")).toStrictEqual(false);
    expect(numberEvaluator.tryEvaluate(" \n \n \t\t \r")).toStrictEqual(false);
  });

  test("should return true if correct number is passed", () => {
    const input = " 12331  ";
    const result = numberEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });

  test("should return true if variable passed is number", () => {
    const input = " someName  ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someName",
      "number",
      123432,
      true,
      scope,
    );
    variableBlock.execute();

    const result = numberEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test("should return true if variable passed is non-number", () => {
    const input = " someName  ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someName",
      "string",
      "some random string",
      true,
      scope,
    );
    variableBlock.execute();

    const result = numberEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });
});

describe("check the evaluate functionality of number evaluator.", () => {
  let scope: Scope;
  let numberEvaluator: NumberEvaluator;
  beforeEach(() => {
    scope = new Scope();
    numberEvaluator = new NumberEvaluator(scope);
  });

  test("should return the number passed in the input.", () => {
    const input = " 3242234234 ";
    const result = numberEvaluator.evaluate(input);

    expect(result).toStrictEqual(3242234234);
  });

  test("should return value of passed number variable.", () => {
    const input = "  someVariable ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "number",
      2343254235,
      true,
      scope,
    );
    variableBlock.execute();

    const result = numberEvaluator.evaluate(input);
    expect(result).toStrictEqual(2343254235);
  });
});
