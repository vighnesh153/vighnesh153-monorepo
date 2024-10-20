import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { Scope } from "@/models/Scope";

export class ArrayVariableBlock extends VariableBlock {
  constructor(
    public typeOfBlock: VariableBlockType,
    public variableName: string,
    public typeOfVariable: string,
    public value: unknown,
    public isPermanent: boolean,
    parentScope: Scope,
    public typeOfArray: string,
  ) {
    super(
      typeOfBlock,
      variableName,
      typeOfVariable,
      value,
      isPermanent,
      parentScope,
    );
  }

  protected declare(): void {
    if (this.scope.hasVariable(this.variableName)) {
      throw new Error("Trying to declare existing variable.");
    }
    this.scope.variables[this.variableName] = {
      type: this.typeOfVariable,
      value: this.value,
      isPermanent: this.isPermanent,
      arrayType: this.typeOfArray,
    };
  }
}
