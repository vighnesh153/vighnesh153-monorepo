import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';
import { StringExpressionEvaluator } from '@/expression-evaluators/string-expression-evaluator';
import { Scope } from '@/models/Scope';

describe('check the tryEvaluate functionality of string expression evaluator.', () => {
  let scope: Scope;
  let stringExpressionEvaluator: StringExpressionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    stringExpressionEvaluator = new StringExpressionEvaluator(scope);
  });

  test('should return false if in-valid string is passed.', () => {
    expect(stringExpressionEvaluator.tryEvaluate('')).toStrictEqual(false);
    expect(stringExpressionEvaluator.tryEvaluate(' 123  ')).toStrictEqual(false);
    expect(stringExpressionEvaluator.tryEvaluate('true   ')).toStrictEqual(false);
    expect(stringExpressionEvaluator.tryEvaluate('  ')).toStrictEqual(false);
    expect(stringExpressionEvaluator.tryEvaluate(' \n \n \t\t \r')).toStrictEqual(false);
  });

  test('should return true if correct string is passed', () => {
    // eslint-disable-next-line quotes
    const input = "  'Hello'  ";
    const result = stringExpressionEvaluator.tryEvaluate(input);

    expect(result).toStrictEqual(true);
  });

  test('should return true if variable passed is string', () => {
    const input = ' someName  ';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someName', 'string', ' lol ', true, scope);
    variableBlock.execute();

    const result = stringExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(true);
  });

  test('should return false if variable passed is non-string', () => {
    const input = ' someName  ';

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'someName', 'number', 123, true, scope);
    variableBlock.execute();

    const result = stringExpressionEvaluator.tryEvaluate(input);
    expect(result).toStrictEqual(false);
  });
});

describe('check the evaluate functionality of string expression evaluator.', () => {
  let scope: Scope;
  let stringExpressionEvaluator: StringExpressionEvaluator;
  beforeEach(() => {
    scope = new Scope();
    stringExpressionEvaluator = new StringExpressionEvaluator(scope);
  });

  test('should return the string passed in the input.', () => {
    // eslint-disable-next-line quotes
    const input = " '  i am   a random string ' ";
    const result = stringExpressionEvaluator.evaluate(input);

    expect(result).toStrictEqual('  i am   a random string ');
  });

  test('should return value of passed string variable.', () => {
    const input = '  someVariable ';

    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      'someVariable',
      'string',
      ' Hello     ',
      true,
      scope
    );
    variableBlock.execute();

    const result = stringExpressionEvaluator.evaluate(input);
    expect(result).toStrictEqual(' Hello     ');
  });
});
