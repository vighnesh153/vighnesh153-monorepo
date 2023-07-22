import { BooleanExpressionEvaluator } from '@/expression-evaluators/boolean-expressions/boolean-expression-evaluator';
import { Scope } from '@/models/Scope';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';

describe('check the tryEvaluate functionality of boolean-expression-evaluator.', () => {
  let scope: Scope;
  let booleanExpressionEvaluator: BooleanExpressionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    booleanExpressionEvaluator = new BooleanExpressionEvaluator(scope);
  });

  test('should return false for empty input.', () => {
    const input = '';
    const result = booleanExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return true for a boolean value input.', () => {
    const input = ' true   ';
    const result = booleanExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });

  test('should return false for a numeric value input.', () => {
    const input = ' 123   ';
    const result = booleanExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return false for a string value input.', () => {
    // eslint-disable-next-line quotes
    const input = " 'Hello World'   ";
    const result = booleanExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(false);
  });

  test('should return true for a boolean variable input.', () => {
    const input = ' someVariable  ';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable', 'boolean', true, true, scope);
    variableBlock.execute();

    const result = booleanExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test('should return false for a numeric variable input.', () => {
    const input = ' someVariable  ';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable', 'number', 3424, true, scope);
    variableBlock.execute();

    const result = booleanExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });

  test('should return false for a string variable input.', () => {
    const input = ' someVariable  ';

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      'someVariable',
      'string',
      'Some string',
      true,
      scope
    );
    variableBlock.execute();

    const result = booleanExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });

  test.each([
    ['1 < 2', true],
    ['true and 1 < 2', true],
    ['false or false', true],
    ['1 <= 10', true],
    ['2 >= 90', true],
    // eslint-disable-next-line quotes
    [" 'hello' ", false],
    [' 100', false],
    [' (5 >= 1 and 3 < 1) and  true', true],
  ])('some basic asserts', (input: string, expected: boolean) => {
    const result = booleanExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(expected);
  });
});

describe('check the evaluate functionality of boolean-expression-evaluator.', () => {
  let scope: Scope;
  let booleanExpressionEvaluator: BooleanExpressionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    booleanExpressionEvaluator = new BooleanExpressionEvaluator(scope);
  });

  test.each([
    ['1 < 2', true],
    ['true and 1 < 2', true],
    ['false or false', false],
    ['1 <= 10', true],
    ['2 >= 90', false],
    [' false or 100 < 90', false],
    [' (5 >= 1 and 3 < 1) and  true', false],
    [' (5 >= 1 and 3 > 1) and  true', true],
    [' (5 >= 1 and 3 < 1) or  true', true],
    [' (5 >= 1 and 3 > 1) and  (3 < 17 and 17 < 15)', false],
    [' (5 >= 1 and 3 > 1) and  (3 < 17 and 17 > 15)', true],
    [' (5 >= 1 and 3 > 1) and  (3 < 17 and 17 >= 15)', true],
    [' (5 >= 1 and 3 < 1) or  (3 < 17 and 17 >= 15)', true],
    [' (5 >= 1 and 3 < 1) or  (3 > 17 and 17 >= 15)', false],
  ])('should evaluate simple boolean expressions', (input: string, expected: boolean) => {
    const result = booleanExpressionEvaluator.evaluate(input);
    expect(result).toStrictEqual(expected);
  });

  test('should evaluate the boolean expression also using the variable.', () => {
    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someVariable', 'number', 42, true, scope);
    variableBlock.execute();

    const input = '( 3 < 4 and someVariable >= 10)';

    const result = booleanExpressionEvaluator.evaluate(input);
    expect(result).toStrictEqual(true);
  });
});
