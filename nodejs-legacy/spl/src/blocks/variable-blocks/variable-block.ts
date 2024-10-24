import { Block } from "@/blocks/Block";
import { Scope } from "@/models/Scope";
import { existingKeywords } from "@/helpers/existing-keywords";
import { isValidIdentifier } from "@/helpers/is-valid-identifier";

export enum VariableBlockType {
  declare,
  set,
}

export class VariableBlock extends Block {
  scope: Scope;

  constructor(
    public typeOfBlock: VariableBlockType,
    public variableName: string,
    public typeOfVariable: string,
    public value: unknown,
    public isPermanent: boolean,
    parentScope: Scope,
  ) {
    super();
    this.scope = parentScope;

    this.variableName = this.variableName.trim();

    if (existingKeywords.has(this.variableName)) {
      throw new Error(
        `'${this.variableName}' is a keyword and can't be used as an identifier.`,
      );
    }

    if (isValidIdentifier(this.variableName) === false) {
      throw new Error(`'${this.variableName}' is not a valid identifier name.`);
    }
  }

  protected declare(): void {
    if (this.scope.hasVariable(this.variableName)) {
      throw new Error("Trying to declare existing variable.");
    }
    this.scope.variables[this.variableName] = {
      type: this.typeOfVariable,
      value: this.value,
      isPermanent: this.isPermanent,
    };
  }

  protected set(): void {
    if (this.scope.hasVariable(this.variableName) === false) {
      throw new Error("Trying to set value of not-declared variable.");
    } else {
      const variable = this.scope.getVariable(this.variableName);
      if (variable.isPermanent) {
        throw new Error("Tried to modify a permanent variable.");
      }
      this.scope.getVariable(this.variableName).value = this.value;
    }
  }

  execute(): void {
    if (this.typeOfBlock === VariableBlockType.declare) {
      this.declare();
    } else {
      this.set();
    }
  }
}
