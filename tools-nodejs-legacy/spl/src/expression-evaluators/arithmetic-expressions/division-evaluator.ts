// @ts-nocheck

import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { bugReporter } from "@/language-bug-handling";
import {
  arithmeticOperationEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-operation-evaluator";

export class DivisionEvaluator extends ExpressionEvaluator {
  private identifier: string = "/";

  constructor(public scope: Scope) {
    super();
  }

  tryEvaluate(text: string): boolean {
    return text.includes(this.identifier);
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      // @ts-ignore
      return arithmeticOperationEvaluator(
        text,
        this.identifier,
        this.scope,
        (lhs, rhs) => lhs / rhs,
      );
    } else {
      bugReporter.report("INVALID_DIVISION_OPERATION");
    }
  }
}
