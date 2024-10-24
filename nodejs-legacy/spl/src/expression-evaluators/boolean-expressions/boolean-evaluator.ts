import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { bugReporter } from "@/language-bug-handling";
import { BooleanParser } from "@/parsers/data-type-parsers/primitive-parsers/boolean-parser";

export class BooleanEvaluator extends ExpressionEvaluator {
  private static booleanParser = BooleanParser.instance;

  constructor(public scope: Scope) {
    super();
  }

  tryEvaluate(text: string): boolean {
    const trimmed = text.trim();
    if (BooleanEvaluator.booleanParser.tryParse(trimmed)) {
      return true;
    }
    return this.scope.hasVariable(trimmed) &&
      this.scope.getVariable(trimmed).type === "boolean";
  }

  evaluate(text: string): unknown {
    const trimmed = text.trim();
    if (this.tryEvaluate(trimmed)) {
      if (BooleanEvaluator.booleanParser.tryParse(trimmed)) {
        return BooleanEvaluator.booleanParser.parse(trimmed);
      }
      return this.scope.getVariable(trimmed).value;
    } else {
      bugReporter.report("EVALUATING_INVALID_BOOLEAN");
    }
  }
}
