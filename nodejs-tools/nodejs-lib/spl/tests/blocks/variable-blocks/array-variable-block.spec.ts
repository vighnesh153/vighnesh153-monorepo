import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

import { Scope } from "@/models/Scope";
import { ArrayVariableBlock } from "@/blocks/variable-blocks/array-variable-block";

describe("check functionality of variable block", () => {
  let variableBlock: VariableBlock;
  beforeEach(() => {
    variableBlock = new ArrayVariableBlock(
      VariableBlockType.declare,
      "Some_Variable_Name",
      "array",
      [1, 23, 45 + 55],
      false,
      new Scope(),
      "number",
    );
  });

  test(
    "should declare an array variable in scope when " +
      "executed on a declaration VariableBlock",
    () => {
      variableBlock.execute();
      const variable = variableBlock.scope.getVariable("Some_Variable_Name");

      expect(variable.value).toStrictEqual([1, 23, 100]);
      expect(variable.isPermanent).toStrictEqual(false);
    },
  );

  test(
    "should modify variable in scope when " +
      "executed on a set ArrayVariableBlock",
    () => {
      // Declaration
      variableBlock.execute();

      // Set
      variableBlock = new ArrayVariableBlock(
        VariableBlockType.set,
        "Some_Variable_Name",
        "number",
        [1, 2],
        false,
        variableBlock.scope,
        "number",
      );
      variableBlock.execute();

      const variable = variableBlock.scope.getVariable("Some_Variable_Name");

      expect(variable.value).toStrictEqual([1, 2]);
    },
  );

  test("should return the type of the array.", () => {
    const block = variableBlock as ArrayVariableBlock;
    expect(block.typeOfArray).toStrictEqual("number");
  });
});
