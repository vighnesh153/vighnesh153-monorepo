import { BooleanEvaluator } from "@/expression-evaluators/boolean-expressions/boolean-evaluator";
import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of boolean evaluator.", () => {
  let scope: Scope;
  let booleanEvaluator: BooleanEvaluator;
  beforeEach(() => {
    scope = new Scope();
    booleanEvaluator = new BooleanEvaluator(scope);
  });

  test("should return false if in-valid booleans are passed.", () => {
    expect(booleanEvaluator.tryEvaluate("")).toStrictEqual(false);
    // eslint-disable-next-line quotes
    expect(booleanEvaluator.tryEvaluate(" 'Hello'  ")).toStrictEqual(false);
    expect(booleanEvaluator.tryEvaluate(" 23424  ")).toStrictEqual(false);
    expect(booleanEvaluator.tryEvaluate("  ")).toStrictEqual(false);
    expect(booleanEvaluator.tryEvaluate(" [  1, 454] ")).toStrictEqual(false);
    expect(booleanEvaluator.tryEvaluate(" \n \n \t\t \r")).toStrictEqual(false);
  });

  test("should return true if correct boolean is passed", () => {
    const input = " false  ";
    const result = booleanEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });

  test("should return true if variable passed is boolean", () => {
    const input = " someName  ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someName",
      "boolean",
      true,
      true,
      scope,
    );
    variableBlock.execute();

    const result = booleanEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test("should return true if variable passed is non-boolean", () => {
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

    const result = booleanEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });
});

describe("check the evaluate functionality of boolean evaluator.", () => {
  let scope: Scope;
  let booleanEvaluator: BooleanEvaluator;
  beforeEach(() => {
    scope = new Scope();
    booleanEvaluator = new BooleanEvaluator(scope);
  });

  test("should return the boolean passed in the input.", () => {
    const input = " true ";
    const result = booleanEvaluator.evaluate(input);

    expect(result).toStrictEqual(true);
  });

  test("should return value of passed boolean variable.", () => {
    const input = "  someVariable ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "boolean",
      false,
      true,
      scope,
    );
    variableBlock.execute();

    const result = booleanEvaluator.evaluate(input);
    expect(result).toStrictEqual(false);
  });
});
