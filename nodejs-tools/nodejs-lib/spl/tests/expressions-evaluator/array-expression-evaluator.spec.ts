import { ArrayExpressionEvaluator } from "@/expression-evaluators/array-expression-evaluator";
import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of array expression evaluator.", () => {
  let arrayExpressionEvaluator: ArrayExpressionEvaluator;
  let scope: Scope;
  beforeEach(() => {
    scope = new Scope();
    arrayExpressionEvaluator = new ArrayExpressionEvaluator(scope);
  });

  test.each([
    [" [  1, 2, 3, 4, 5     ]    "],
    [" [  true,    false     ,     false     ]    "],
    // eslint-disable-next-line quotes
    ["   [    'aaa'   ,    'b' ]  "],
  ])("should evaluate to true.", (input: string) => {
    const result = arrayExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test.each([
    [" [  1, 2, true     , 5     ]    "],
    [" [  true,    false     ,     false         "],
    // eslint-disable-next-line quotes
    ["   [    'aaa'       'b' ]  "],
  ])("should evaluate to false.", (input: string) => {
    const result = arrayExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });

  test.each([
    [" [  1, 2, 1 + 3 * 9     ,  56 - 3 * 7     ]    "],
    [" [  true,    false     ,     false   or  true     ]    "],
    // eslint-disable-next-line quotes
    ["   [    'aaa' ,  someStringVariable ]  "],
  ])("should evaluate to true.", (input: string) => {
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someStringVariable",
      "string",
      "Hello",
      true,
      scope,
    );
    variableBlock.execute();

    const result = arrayExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test.each([
    [" [  1, 2, 1 + 3 * 9     ,  56 - 3 * 7   ,  someStringVariable  ]    "],
    [" [  true,    someStringVariable     ,     false   or  true     ]    "],
    // eslint-disable-next-line quotes
    ["   [    'aaa' ,    true and (false or true) ]  "],
  ])("should evaluate to false.", (input: string) => {
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someStringVariable",
      "string",
      "Hello",
      true,
      scope,
    );
    variableBlock.execute();

    const result = arrayExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });
});

describe("check the evaluate functionality of array expression evaluator.", () => {
  let arrayExpressionEvaluator: ArrayExpressionEvaluator;
  let scope: Scope;
  beforeEach(() => {
    scope = new Scope();
    arrayExpressionEvaluator = new ArrayExpressionEvaluator(scope);
  });

  test.each([
    [" [  1, 2, 3, 4, 5     ]    ", [1, 2, 3, 4, 5]],
    [" [  true,    false     ,     false     ]    ", [true, false, false]],
    // eslint-disable-next-line quotes
    ["   [    'aaa'   ,    'b' ]  ", ["aaa", "b"]],
  ])("should evaluate the array.", (input: string, expected: unknown[]) => {
    const result = arrayExpressionEvaluator.evaluate(input);
    expect(result).toStrictEqual(expected);
  });

  test.each([
    [" [  1, 2, 1 + 3 * 9     ,  56 - 3 * 7     ]    ", [1, 2, 28, 35]],
    [" [  true,    false     ,     false   or  true     ]    ", [
      true,
      false,
      true,
    ]],
    // eslint-disable-next-line quotes
    ["   [    'aaa' ,  someStringVariable ]  ", ["aaa", "Hello"]],
  ])(
    "should evaluate the array from expressions.",
    (input: string, expected: unknown[]) => {
      const variableBlock = new VariableBlock(
        VariableBlockType.declare,
        "someStringVariable",
        "string",
        "Hello",
        true,
        scope,
      );
      variableBlock.execute();

      const result = arrayExpressionEvaluator.evaluate(input);
      expect(result).toStrictEqual(expected);
    },
  );
});

describe("check the getType functionality of array expression evaluator.", () => {
  let arrayExpressionEvaluator: ArrayExpressionEvaluator;
  let scope: Scope;
  beforeEach(() => {
    scope = new Scope();
    arrayExpressionEvaluator = new ArrayExpressionEvaluator(scope);
  });

  test.each([
    [" [  1, 2, 3, 4, 5     ]    ", "number"],
    [" [  true,    false     ,     false     ]    ", "boolean"],
    // eslint-disable-next-line quotes
    ["   [    'aaa'   ,    'b' ]  ", "string"],
    ["   [     ]  ", "any"],
  ])(
    "should evaluate the type of array.",
    (input: string, expected: string) => {
      const result = arrayExpressionEvaluator.getType(input);
      expect(result).toStrictEqual(expected);
    },
  );

  test.each([
    [" [  1, 2, 1 + 3 * 9     ,  56 - 3 * 7     ]    ", "number"],
    [" [  true,    false     ,     false   or  true     ]    ", "boolean"],
    // eslint-disable-next-line quotes
    ["   [   someStringVariable    ,     'aaa'  ]  ", "string"],
  ])(
    "should evaluate the type of array from expressions.",
    (input: string, expected: string) => {
      const variableBlock = new VariableBlock(
        VariableBlockType.declare,
        "someStringVariable",
        "string",
        "Hello",
        true,
        scope,
      );
      variableBlock.execute();

      const result = arrayExpressionEvaluator.getType(input);
      expect(result).toStrictEqual(expected);
    },
  );
});
