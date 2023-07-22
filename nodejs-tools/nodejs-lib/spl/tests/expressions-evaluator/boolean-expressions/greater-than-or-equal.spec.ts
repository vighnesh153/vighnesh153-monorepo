/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Scope } from '@/models/Scope';
import { GreaterThanOrEqual } from '@/expression-evaluators/boolean-expressions/greater-than-or-equal';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';

describe('check the tryEvaluate functionality of greater-than-or-equal.', () => {
  let scope: Scope;
  let greaterThanOrEqual: GreaterThanOrEqual;
  beforeEach(() => {
    scope = new Scope();
    greaterThanOrEqual = new GreaterThanOrEqual(scope);
  });

  test('should return false if input is empty.', () => {
    const input = '';
    const result = greaterThanOrEqual.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return false if input is not a valid greater-than or equal expression.', () => {
    const input = '1 == 2';
    const result = greaterThanOrEqual.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return true if input is a valid greater-than-or-equal expression.', () => {
    const input = '1 >= 2';
    const result = greaterThanOrEqual.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe('check the evaluate functionality of greater-than or equal.', () => {
  let scope: Scope;
  let greaterThanOrEqual: GreaterThanOrEqual;
  beforeEach(() => {
    scope = new Scope();
    greaterThanOrEqual = new GreaterThanOrEqual(scope);
  });

  test('should return false for incorrect greater than or equal comparision.', () => {
    const input = ' 2 >= 56';
    const result = greaterThanOrEqual.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual('false');
  });

  test('should return true for correct greater than or equal comparision.', () => {
    const input = ' 42 >= -41';
    const result = greaterThanOrEqual.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual('true');
  });

  test('should compare variable numbers.', () => {
    const input = ' someVariable1 >= 100';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable1', 'number', 101, true, scope);
    variableBlock.execute();

    const result = greaterThanOrEqual.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual('true');
  });
});
