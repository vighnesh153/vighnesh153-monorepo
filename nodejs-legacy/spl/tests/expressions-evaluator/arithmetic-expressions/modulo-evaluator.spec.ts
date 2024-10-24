import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { ModuloEvaluator } from "@/expression-evaluators/arithmetic-expressions/modulo-evaluator";

describe("check the tryEvaluate functionality of modulo evaluator.", () => {
  let scope: Scope;
  let moduloEvaluator: ModuloEvaluator;
  beforeEach(() => {
    scope = new Scope();
    moduloEvaluator = new ModuloEvaluator(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = moduloEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid modulo expression.", () => {
    const input = "1 - 2";
    const result = moduloEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid modulo expression.", () => {
    const input = "15    %    -5";
    const result = moduloEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of modulo evaluator.", () => {
  let scope: Scope;
  let moduloEvaluator: ModuloEvaluator;
  beforeEach(() => {
    scope = new Scope();
    moduloEvaluator = new ModuloEvaluator(scope);
  });

  test("should mod positive numbers.", () => {
    const input = " 12 %  5";
    const result = moduloEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("2");
  });

  test("should mod negative numbers.", () => {
    const input = " -56  %  3";
    const result = moduloEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("-2");
  });

  test("should mod number from variable.", () => {
    const input = " someVariable1 % 8";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "number",
      15,
      true,
      scope,
    );
    variableBlock.execute();

    const result = moduloEvaluator.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("7");
  });
});
