/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Scope } from '@/models/Scope';
import { LessThan } from '@/expression-evaluators/boolean-expressions/less-than';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';

describe('check the tryEvaluate functionality of less-than.', () => {
  let scope: Scope;
  let lessThan: LessThan;
  beforeEach(() => {
    scope = new Scope();
    lessThan = new LessThan(scope);
  });

  test('should return false if input is empty.', () => {
    const input = '';
    const result = lessThan.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return false if input is not a valid less-than expression.', () => {
    const input = '1 != 2';
    const result = lessThan.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return true if input is a valid less-than expression.', () => {
    const input = '1 < 2';
    const result = lessThan.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe('check the evaluate functionality of less-than.', () => {
  let scope: Scope;
  let lessThan: LessThan;
  beforeEach(() => {
    scope = new Scope();
    lessThan = new LessThan(scope);
  });

  test('should return false for incorrect less than comparision.', () => {
    const input = ' 200 < 56';
    const result = lessThan.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual('false');
  });

  test('should return true for correct less than comparision.', () => {
    const input = ' 40 < 41';
    const result = lessThan.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual('true');
  });

  test('should compare variable numbers.', () => {
    const input = ' someVariable1 < 100';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable1', 'number', 99, true, scope);
    variableBlock.execute();

    const result = lessThan.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual('true');
  });
});
