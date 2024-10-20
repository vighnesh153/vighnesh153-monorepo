import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { bugReporter } from "@/language-bug-handling";
import { StringParser } from "@/parsers/data-type-parsers/primitive-parsers/string-parser";
import { ArrayIndexEvaluator } from "@/expression-evaluators/array-index-evaluator";

export class StringExpressionEvaluator extends ExpressionEvaluator {
  private static stringParser = StringParser.instance;
  private arrayIndexEvaluator: ArrayIndexEvaluator;

  constructor(public scope: Scope) {
    super();
    this.arrayIndexEvaluator = new ArrayIndexEvaluator(scope, "string");
  }

  tryEvaluate(text: string): boolean {
    const trimmed = text.trim();
    if (StringExpressionEvaluator.stringParser.tryParse(trimmed)) {
      return true;
    }
    return this.scope.hasVariable(trimmed) &&
      this.scope.getVariable(trimmed).type === "string";
  }

  evaluate(text: string): unknown {
    const trimmed = text.trim();
    if (this.tryEvaluate(trimmed)) {
      if (StringExpressionEvaluator.stringParser.tryParse(trimmed)) {
        return StringExpressionEvaluator.stringParser.parse(trimmed);
      }
      return this.scope.getVariable(trimmed).value;
    } else {
      bugReporter.report("EVALUATING_INVALID_STRING");
    }
  }
}
