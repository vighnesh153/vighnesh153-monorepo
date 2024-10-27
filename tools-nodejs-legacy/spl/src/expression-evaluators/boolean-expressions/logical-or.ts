// @ts-nocheck

import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { booleanComparisionEvaluator } from "@/expression-evaluators/boolean-expressions/boolean-comparision-evaluator";
import { bugReporter } from "@/language-bug-handling";

export class LogicalOr extends ExpressionEvaluator {
  identifier = "or";

  constructor(public scope: Scope) {
    super();
  }

  tryEvaluate(text: string): boolean {
    return text.includes(this.identifier);
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      // @ts-ignore
      return booleanComparisionEvaluator(
        text,
        this.identifier,
        this.scope,
        (lhs, rhs) => lhs || rhs,
      );
    } else {
      bugReporter.report("INVALID_LOGICAL_OR_COMPARISION");
    }
  }
}
