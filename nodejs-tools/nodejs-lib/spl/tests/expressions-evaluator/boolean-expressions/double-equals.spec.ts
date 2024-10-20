import { DoubleEquals } from "@/expression-evaluators/boolean-expressions/double-equals";
import { Scope } from "@/models/Scope";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of double equals.", () => {
  let scope: Scope;
  let doubleEquals: DoubleEquals;
  beforeEach(() => {
    scope = new Scope();
    doubleEquals = new DoubleEquals(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = doubleEquals.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid double-equals expression.", () => {
    const input = "1 != 2";
    const result = doubleEquals.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid double-equals expression.", () => {
    const input = "1 == 2";
    const result = doubleEquals.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of double equals.", () => {
  let scope: Scope;
  let doubleEquals: DoubleEquals;
  beforeEach(() => {
    scope = new Scope();
    doubleEquals = new DoubleEquals(scope);
  });

  test("should return false for non-equal numbers equality comparision.", () => {
    const input = " 2 == 56";
    const result = doubleEquals.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("false");
  });

  test("should return true for equal numbers equality comparision.", () => {
    const input = " 42 == 42";
    const result = doubleEquals.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });

  test("should compare variable numbers.", () => {
    const input = " someVariable1 == 100";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "number",
      100,
      true,
      scope,
    );
    variableBlock.execute();

    const result = doubleEquals.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });
});
