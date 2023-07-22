/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Scope } from '@/models/Scope';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';
import { MultiplicationEvaluator } from '@/expression-evaluators/arithmetic-expressions/multiplication-evaluator';

describe('check the tryEvaluate functionality of multiplication evaluator.', () => {
  let scope: Scope;
  let multiplicationEvaluator: MultiplicationEvaluator;
  beforeEach(() => {
    scope = new Scope();
    multiplicationEvaluator = new MultiplicationEvaluator(scope);
  });

  test('should return false if input is empty.', () => {
    const input = '';
    const result = multiplicationEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return false if input is not a valid multiplication expression.', () => {
    const input = '1 - 2';
    const result = multiplicationEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return true if input is a valid multiplication expression.', () => {
    const input = '15 *  -5';
    const result = multiplicationEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });
});

describe('check the evaluate functionality of multiplication evaluator.', () => {
  let scope: Scope;
  let multiplicationEvaluator: MultiplicationEvaluator;
  beforeEach(() => {
    scope = new Scope();
    multiplicationEvaluator = new MultiplicationEvaluator(scope);
  });

  test('should multiply positive numbers.', () => {
    const input = ' 12 *  4';
    const result = multiplicationEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual('48');
  });

  test('should multiply negative numbers.', () => {
    const input = ' -2  *  -56';
    const result = multiplicationEvaluator.evaluate(input);

    // @ts-ignore
    expect(result.trim()).toStrictEqual('112');
  });

  test('should multiply number from variable.', () => {
    const input = ' someVariable1 * -8';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable1', 'number', 7, true, scope);
    variableBlock.execute();

    const result = multiplicationEvaluator.evaluate(input);
    // @ts-ignore
    expect(result.trim()).toStrictEqual('-56');
  });
});
