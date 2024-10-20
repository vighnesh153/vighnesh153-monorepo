// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { bugReporter } from "@/language-bug-handling";
// prettier-ignore
import {
  arithmeticOperationEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-operation-evaluator";

export class AdditionEvaluator extends ExpressionEvaluator {
  private identifier: string = "+";

  constructor(public scope: Scope) {
    super();
  }

  tryEvaluate(text: string): boolean {
    return text.includes(this.identifier);
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      return arithmeticOperationEvaluator(
        text,
        this.identifier,
        this.scope,
        (lhs, rhs) => lhs + rhs,
      );
    } else {
      bugReporter.report("INVALID_ADDITION_OPERATION");
    }
  }
}
