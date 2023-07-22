import { Scope } from '@/models/Scope';
import { Variable } from '@/models/Variable';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';

describe('check hasVariable functionality of scope.', () => {
  let scope: Scope;
  let variable: Variable;
  beforeEach(() => {
    scope = new Scope();
    variable = { type: 'any', value: 'any' };
  });

  test('should return false if identifier is absent.', () => {
    const result = scope.hasVariable('some identifier');
    expect(result).toStrictEqual(false);
  });

  test('should return true if identifier is present in current scope.', () => {
    scope.variables.identifierName = variable;

    const result = scope.hasVariable('identifierName');
    expect(result).toStrictEqual(true);
  });

  test('should return true if identifier is present in parent scope.', () => {
    const parentScope = new Scope();
    parentScope.variables.someIdentifier = variable;

    scope.parentScope = parentScope;

    const result = scope.hasVariable('someIdentifier');
    expect(result).toStrictEqual(true);
  });

  test('should return true if identifier is present in grand-parent scope.', () => {
    const grandParentScope = new Scope();
    grandParentScope.variables.someOtherIdentifier = variable;

    scope.parentScope = new Scope();
    scope.parentScope.parentScope = grandParentScope;

    const result = scope.hasVariable('someOtherIdentifier');
    expect(result).toStrictEqual(true);
  });
});

describe('check getVariable functionality of scope.', () => {
  let scope: Scope;
  let variable: Variable;
  beforeEach(() => {
    scope = new Scope();
    variable = { type: 'any', value: 'any' };
  });

  test('should return variable if it exists in current scope.', () => {
    scope.variables['variableName'] = variable;
    const result = scope.getVariable('variableName');
    expect(result).toStrictEqual(variable);
  });

  test('should return variable if it exists in parent scope.', () => {
    variable.value = 'Some random value';

    const parentScope = new Scope();
    parentScope.variables.someIdentifier = variable;

    scope.parentScope = parentScope;

    const result = scope.getVariable('someIdentifier');
    expect(result).toStrictEqual(variable);
  });

  test('should return variable if it exists in grand-parent scope.', () => {
    variable.value = 12445.32;

    const grandParentScope = new Scope();
    grandParentScope.variables.someOtherIdentifier = variable;

    scope.parentScope = new Scope();
    scope.parentScope.parentScope = grandParentScope;

    const result = scope.getVariable('someOtherIdentifier');
    expect(result).toStrictEqual(variable);
  });
});

describe('check shallowClone functionality of scope.', () => {
  let scope: Scope;
  let clonedScope: Scope;
  beforeEach(() => {
    scope = new Scope();
    clonedScope = scope.shallowClone();
  });

  it('should not add variables added to clone, in the original copy.', () => {
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      'someVariable',
      'number',
      123,
      true,
      clonedScope
    );
    variableBlock.execute();

    const cloneHasVariable = clonedScope.hasVariable('someVariable');
    const originalHasVariable = scope.hasVariable('someVariable');

    expect(cloneHasVariable).toStrictEqual(true);
    expect(originalHasVariable).toStrictEqual(false);
  });

  it('should not add variables added to original copy, in the cloned.', () => {
    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable', 'number', 123, true, scope);
    variableBlock.execute();

    const originalHasVariable = scope.hasVariable('someVariable');
    const cloneHasVariable = clonedScope.hasVariable('someVariable');

    expect(originalHasVariable).toStrictEqual(true);
    expect(cloneHasVariable).toStrictEqual(false);
  });
});
