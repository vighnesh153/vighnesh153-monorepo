/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { reverseString } from '@/helpers/reverse-string';
import { parseInitialNumberOrIdentifier } from '@/helpers/parse-initial-number-or-identifier';
import { Scope } from '@/models/Scope';
// prettier-ignore
import { 
  ArithmeticExpressionEvaluator,
} from 'src/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator';

export const getPreviousAndNextNumberOrIdentifier = (
  text: string,
  operator: string,
  scope: Scope
): { prev: number; next: number; originalExpression: string } => {
  const individualComponents = text.split(operator);
  const reversedLhs = reverseString(individualComponents[0]);
  const extractedIdentifierOrNumber = parseInitialNumberOrIdentifier(reversedLhs, true);

  const lhs = reverseString(extractedIdentifierOrNumber);
  const rhs = parseInitialNumberOrIdentifier(individualComponents[1], false);

  const arithmeticExpressionEvaluator = new ArithmeticExpressionEvaluator(scope);

  if (
    arithmeticExpressionEvaluator.tryEvaluate(lhs) === false ||
    arithmeticExpressionEvaluator.tryEvaluate(rhs) === false
  ) {
    throw new Error(`Can't compare non-number symbols.`);
  }

  return {
    // @ts-ignore
    prev: arithmeticExpressionEvaluator.evaluate(lhs),
    // @ts-ignore
    next: arithmeticExpressionEvaluator.evaluate(rhs),
    originalExpression: `${lhs}${operator}${rhs}`,
  };
};
