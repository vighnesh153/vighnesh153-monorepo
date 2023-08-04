/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ExpressionEvaluator } from '@/expression-evaluators/expression-evaluator';
import { Scope } from '@/models/Scope';
import { bugReporter } from '@/language-bug-handling';
import { reverseString } from 'src/helpers/reverse-string';
import { parseInitialNumberOrIdentifier } from 'src/helpers/parse-initial-number-or-identifier';
import { NumberEvaluator } from 'src/expression-evaluators/arithmetic-expressions/number-evaluator';

export class SubtractionEvaluator extends ExpressionEvaluator {
  private static identifier: string = '-';

  constructor(public scope: Scope) {
    super();
  }

  private static getNextAndPrevIdentifiers(
    unProcessedLhs: string,
    unProcessedRhs: string
  ): { lhs: string; rhs: string } {
    const reversedLhs = reverseString(unProcessedLhs);
    const extractedIdentifierOrNumber = parseInitialNumberOrIdentifier(reversedLhs, true);

    return {
      lhs: reverseString(extractedIdentifierOrNumber),
      rhs: parseInitialNumberOrIdentifier(unProcessedRhs, false),
    };
  }

  private getValidSplitIndex(text: string): number {
    const individualComponents = text.split(SubtractionEvaluator.identifier);
    const numberEvaluator = new NumberEvaluator(this.scope);

    for (let i = 0; i < individualComponents.length - 1; i++) {
      const mergedLhs = individualComponents.slice(0, i + 1).join(SubtractionEvaluator.identifier);
      const mergedRhs = individualComponents
        .slice(i + 1, individualComponents.length)
        .join(SubtractionEvaluator.identifier);

      const { lhs, rhs } = SubtractionEvaluator.getNextAndPrevIdentifiers(mergedLhs, mergedRhs);

      if (numberEvaluator.tryEvaluate(lhs) === false || numberEvaluator.tryEvaluate(rhs) === false) {
        continue;
      }

      return mergedLhs.length;
    }

    return -1;
  }

  tryEvaluate(text: string): boolean {
    if (text.includes(SubtractionEvaluator.identifier) === false) {
      return false;
    }

    return this.getValidSplitIndex(text) > -1;
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      const splitIndex = this.getValidSplitIndex(text);

      const unProcessedLhs = text.slice(0, splitIndex);
      const unProcessedRhs = text.slice(splitIndex + 1);

      const { lhs, rhs } = SubtractionEvaluator.getNextAndPrevIdentifiers(unProcessedLhs, unProcessedRhs);

      const numberEvaluator = new NumberEvaluator(this.scope);
      const result = {
        prev: numberEvaluator.evaluate(lhs),
        next: numberEvaluator.evaluate(rhs),
        originalExpression: `${lhs}${SubtractionEvaluator.identifier}${rhs}`,
      };

      // @ts-ignore
      return text.replace(result.originalExpression, `${result.prev - result.next}`);
    } else {
      bugReporter.report('INVALID_SUBTRACTION_OPERATION');
    }
  }
}
