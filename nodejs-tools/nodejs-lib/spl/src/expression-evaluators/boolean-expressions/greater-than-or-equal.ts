import { ExpressionEvaluator } from '@/expression-evaluators/expression-evaluator';
import { Scope } from '@/models/Scope';
// prettier-ignore
import { 
  numericComparisionEvaluator,
} from '@/expression-evaluators/boolean-expressions/numeric-comparision-evaluator';
import { bugReporter } from '@/language-bug-handling';

export class GreaterThanOrEqual extends ExpressionEvaluator {
  private identifier: string = '>=';

  constructor(public scope: Scope) {
    super();
  }

  tryEvaluate(text: string): boolean {
    return text.includes(this.identifier);
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      return numericComparisionEvaluator(text, this.identifier, this.scope, (lhs, rhs) => lhs >= rhs);
    } else {
      bugReporter.report('INVALID_GREATER_THAN_OR_EQUAL_COMPARISION');
    }
  }
}
