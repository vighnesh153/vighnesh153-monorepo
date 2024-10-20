import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { NumberParser } from "@/parsers/data-type-parsers/primitive-parsers/number-parser";
import { bugReporter } from "@/language-bug-handling";
import { ArrayIndexEvaluator } from "@/expression-evaluators/array-index-evaluator";

export class NumberEvaluator extends ExpressionEvaluator {
  private static numberParser = NumberParser.instance;
  private arrayIndexEvaluator: ArrayIndexEvaluator;

  constructor(public scope: Scope) {
    super();
    this.arrayIndexEvaluator = new ArrayIndexEvaluator(scope, "number");
  }

  tryEvaluate(text: string): boolean {
    const trimmed = text.trim();
    if (NumberEvaluator.numberParser.tryParse(trimmed)) {
      return true;
    }
    if (
      this.scope.hasVariable(trimmed) &&
      this.scope.getVariable(trimmed).type === "number"
    ) {
      return true;
    }
    return this.arrayIndexEvaluator.tryEvaluate(text.trim());
  }

  evaluate(text: string): unknown {
    const trimmed = text.trim();
    if (this.tryEvaluate(trimmed)) {
      if (NumberEvaluator.numberParser.tryParse(trimmed)) {
        return NumberEvaluator.numberParser.parse(trimmed);
      }
      if (this.scope.hasVariable(trimmed)) {
        return this.scope.getVariable(trimmed).value;
      }
      return this.arrayIndexEvaluator.evaluate(trimmed);
    } else {
      bugReporter.report("EVALUATING_INVALID_NUMBER");
    }
  }
}
