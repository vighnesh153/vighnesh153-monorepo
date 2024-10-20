import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import {
  ArithmeticExpressionEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator";

describe("check the tryEvaluate functionality of arithmetic-expression-evaluator.", () => {
  let scope: Scope;
  let arithmeticExpressionEvaluator: ArithmeticExpressionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    arithmeticExpressionEvaluator = new ArithmeticExpressionEvaluator(scope);
  });

  test("should return false for empty input.", () => {
    const input = "";
    const result = arithmeticExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true for a arithmetic value input.", () => {
    const input = " 535 - 66 * 45   ";
    const result = arithmeticExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });

  test("should return false for a boolean value input.", () => {
    const input = " true   ";
    const result = arithmeticExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false for a string value input.", () => {
    const input = " 'Hello World'   ";
    const result = arithmeticExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true for a arithmetic variable input.", () => {
    const input = " someVariable  ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "number",
      424,
      true,
      scope,
    );
    variableBlock.execute();

    const result = arithmeticExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test("should return false for a boolean variable input.", () => {
    const input = " someVariable  ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "boolean",
      true,
      true,
      scope,
    );
    variableBlock.execute();

    const result = arithmeticExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });

  test("should return false for a string variable input.", () => {
    const input = " someVariable  ";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "string",
      "Some string",
      true,
      scope,
    );
    variableBlock.execute();

    const result = arithmeticExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });

  test.each([
    ["1 + 2", true],
    ["7 + 2 * 4", true],
    ["1 - -2", true],
    ["1 / 2", true],
    ["100 %  12", true],
    ["(1 + 2) * -19", true],
    ["3 / (4 + 2) * 9", true],
  ])("some basic asserts", (input: string, expected: boolean) => {
    const result = arithmeticExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(expected);
  });
});

describe("check the evaluate functionality of arithmetic-expression-evaluator.", () => {
  let scope: Scope;
  let arithmeticExpressionEvaluator: ArithmeticExpressionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    arithmeticExpressionEvaluator = new ArithmeticExpressionEvaluator(scope);
  });

  test.each([
    ["1 + 2", 3],
    ["7 + 2 * 4", 15],
    ["1 - -2", 3],
    ["1 / 2", 0.5],
    ["100 %  12", 4],
    ["(1 + 2) * -19", -57],
    ["3 / (4 + 2) * 9", 4.5],
  ])(
    "should evaluate simple arithmetic expressions",
    (input: string, expected: number) => {
      const result = arithmeticExpressionEvaluator.evaluate(input);
      expect(result).toStrictEqual(expected);
    },
  );

  test.each([
    ["3 / (4 + 2)  9", false],
    ["3 / (4 + 2)9", false],
    ["/ (4 + 2) * 9", false],
  ])("invalid expressions should throw.", (input: string) => {
    expect(() => {
      arithmeticExpressionEvaluator.evaluate(input);
    }).toThrow();
  });

  test("should evaluate the arithmetic expression also using the variable.", () => {
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "number",
      42,
      true,
      scope,
    );
    variableBlock.execute();

    const input = "( 3 * 4 + someVariable * 10)";

    const result = arithmeticExpressionEvaluator.evaluate(input);
    expect(result).toStrictEqual(432);
  });
});
