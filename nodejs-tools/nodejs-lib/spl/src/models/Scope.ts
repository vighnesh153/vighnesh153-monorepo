import { Variable } from '@/models/Variable';

import { bugReporter } from '@/language-bug-handling';
import { FunctionBlock } from '@/blocks/function-block';

export class Scope {
  variables: { [key: string]: Variable } = {};
  parentScope: Scope | null = null;

  functions: { [key: string]: FunctionBlock } = {};

  shallowClone(): Scope {
    const newScope = new Scope();

    if (this.parentScope) {
      newScope.parentScope = this.parentScope;
    }
    newScope.variables = { ...this.variables };
    newScope.functions = { ...this.functions };

    return newScope;
  }

  constructor(parentScope?: Scope) {
    if (parentScope) {
      this.parentScope = parentScope as Scope;
    }
  }

  hasFunction(functionName: string): boolean {
    // eslint-disable-next-line no-prototype-builtins
    if (this.functions.hasOwnProperty(functionName)) {
      return true;
    }
    return this.parentScope === null ? false : (this.parentScope as Scope).hasFunction(functionName);
  }

  getFunction(functionName: string): FunctionBlock {
    // eslint-disable-next-line no-prototype-builtins
    if (this.functions.hasOwnProperty(functionName)) {
      return this.functions[functionName];
    } else if (this.parentScope !== null) {
      return (this.parentScope as Scope).getFunction(functionName);
    } else {
      bugReporter.report('ACCESS_UNDEFINED_SYMBOL');

      // Unreachable return statement, anyway. Added just to make
      // Typescript happy because, it doesn't know that
      // the above line will throw error.
      throw new Error('Unreachable block');
    }
  }

  hasVariable(variableName: string): boolean {
    // eslint-disable-next-line no-prototype-builtins
    if (this.variables.hasOwnProperty(variableName)) {
      return true;
    }
    return this.parentScope === null ? false : (this.parentScope as Scope).hasVariable(variableName);
  }

  getVariable(variableName: string): Variable {
    // eslint-disable-next-line no-prototype-builtins
    if (this.variables.hasOwnProperty(variableName)) {
      return this.variables[variableName];
    } else if (this.parentScope !== null) {
      return (this.parentScope as Scope).getVariable(variableName);
    } else {
      bugReporter.report('ACCESS_UNDEFINED_SYMBOL');

      // Unreachable return statement, anyway. Added just to make
      // Typescript happy because, it doesn't know that
      // the above line will throw error.
      return { type: '', value: 42 };
    }
  }
}
