import { Scope } from '@/models/Scope';
import { ExpressionEvaluator } from '@/expression-evaluators/expression-evaluator';

import { bugReporter } from '@/language-bug-handling';

import { ParenthesisEvaluator } from '@/expression-evaluators/parenthesis-evaluator';
import { DivisionEvaluator } from '@/expression-evaluators/arithmetic-expressions/division-evaluator';
import { MultiplicationEvaluator } from '@/expression-evaluators/arithmetic-expressions/multiplication-evaluator';
import { ModuloEvaluator } from '@/expression-evaluators/arithmetic-expressions/modulo-evaluator';
import { AdditionEvaluator } from '@/expression-evaluators/arithmetic-expressions/addition-evaluator';
import { SubtractionEvaluator } from '@/expression-evaluators/arithmetic-expressions/subtraction-evaluator';
import { NumberEvaluator } from '@/expression-evaluators/arithmetic-expressions/number-evaluator';
import { NumberParser } from '@/parsers/data-type-parsers/primitive-parsers/number-parser';
import { FunctionExpressionEvaluator } from '@/expression-evaluators/function-expression-evaluator';
import { LengthOfArrayEvaluator } from '@/expression-evaluators/arithmetic-expressions/length-of-array-evaluator';

export class ArithmeticExpressionEvaluator extends ExpressionEvaluator {
  readonly expressionEvaluators: ExpressionEvaluator[];

  constructor(public scope: Scope) {
    super();
    this.expressionEvaluators = [];

    // Following order matters
    this.expressionEvaluators.push(new FunctionExpressionEvaluator(this.scope));

    this.expressionEvaluators.push(new LengthOfArrayEvaluator(this.scope));

    this.expressionEvaluators.push(new ParenthesisEvaluator(this.scope, 'arithmetic'));

    this.expressionEvaluators.push(new DivisionEvaluator(this.scope));
    this.expressionEvaluators.push(new MultiplicationEvaluator(this.scope));
    this.expressionEvaluators.push(new ModuloEvaluator(this.scope));

    this.expressionEvaluators.push(new AdditionEvaluator(this.scope));
    this.expressionEvaluators.push(new SubtractionEvaluator(this.scope));

    this.expressionEvaluators.push(new NumberEvaluator(this.scope));
  }

  tryEvaluate(text: string): boolean {
    // Should not have string in expression. To identify, we check if
    // quotes are part of the expression. If yes, then there might
    // be a string.
    if (text.includes(`'`) || text.includes('"')) return false;

    for (const evaluator of this.expressionEvaluators) {
      if (evaluator.tryEvaluate(text)) {
        return true;
      }
    }
    return false;
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      const numberParser = NumberParser.instance;

      while (numberParser.tryParse(text) === false) {
        let parsedByAny = false;
        for (const evaluator of this.expressionEvaluators) {
          if (evaluator.tryEvaluate(text)) {
            try {
              text = '' + evaluator.evaluate(text);
              parsedByAny = true;
              break;
            } catch {
              // do nothing
            }
          }
        }
        if (!parsedByAny) {
          throw new Error('Invalid arithmetic expression');
        }
      }

      return numberParser.parse(text);
    } else {
      bugReporter.report('INVALID_ARITHMETIC_EXPRESSION_EVALUATION');
    }
  }
}
