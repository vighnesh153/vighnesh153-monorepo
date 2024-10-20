import { Scope } from "@/models/Scope";
import { NotEquals } from "@/expression-evaluators/boolean-expressions/not-equals";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check the tryEvaluate functionality of not equals.", () => {
  let scope: Scope;
  let notEquals: NotEquals;
  beforeEach(() => {
    scope = new Scope();
    notEquals = new NotEquals(scope);
  });

  test("should return false if input is empty.", () => {
    const input = "";
    const result = notEquals.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return false if input is not a valid not-equals expression.", () => {
    const input = "1 == 2";
    const result = notEquals.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test("should return true if input is a valid not-equals expression.", () => {
    const input = "1 != 2";
    const result = notEquals.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe("check the evaluate functionality of not equals.", () => {
  let scope: Scope;
  let notEquals: NotEquals;
  beforeEach(() => {
    scope = new Scope();
    notEquals = new NotEquals(scope);
  });

  test("should return false for equal numbers inequality comparision.", () => {
    const input = " 42 != 42";
    const result = notEquals.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("false");
  });

  test("should return true for non-equal numbers inequality comparision.", () => {
    const input = " 42 != 4200";
    const result = notEquals.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });

  test("should compare variable numbers.", () => {
    const input = " someVariable1 != 100";

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable1",
      "number",
      101,
      true,
      scope,
    );
    variableBlock.execute();

    const result = notEquals.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual("true");
  });
});
