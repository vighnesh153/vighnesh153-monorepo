import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { Scope } from "@/models/Scope";
import { bugReporter } from "@/language-bug-handling";
import { BooleanExpressionEvaluator } from "@/expression-evaluators/boolean-expressions/boolean-expression-evaluator";
import {
  ArithmeticExpressionEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator";

export class ParenthesisEvaluator extends ExpressionEvaluator {
  constructor(
    public readonly scope: Scope,
    public readonly type: "arithmetic" | "boolean",
  ) {
    super();
  }

  private static indexOfClosingParenthesis(text: string): number {
    let foundOpeningParenthesis = false;
    let countStartingUnmatched = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "(") {
        countStartingUnmatched++;
        foundOpeningParenthesis = true;
      } else if (text[i] === ")") {
        if (countStartingUnmatched === 0) {
          // Parenthesis group is invalid
          return -1;
        }
        countStartingUnmatched--;
      }

      if (countStartingUnmatched === 0 && foundOpeningParenthesis) {
        return i;
      }
    }

    return -1;
  }

  tryEvaluate(text: string): boolean {
    const indexOfOpeningParenthesis = text.indexOf("(");
    const indexOfClosingParenthesis = ParenthesisEvaluator
      .indexOfClosingParenthesis(text);

    return indexOfOpeningParenthesis >= 0 &&
      indexOfOpeningParenthesis < indexOfClosingParenthesis;
  }

  evaluate(text: string): unknown {
    if (this.tryEvaluate(text)) {
      const indexOfOpeningParenthesis = text.indexOf("(");
      const indexOfClosingParenthesis = ParenthesisEvaluator
        .indexOfClosingParenthesis(text);

      const insideExpression = text.substr(
        indexOfOpeningParenthesis + 1,
        indexOfClosingParenthesis - indexOfOpeningParenthesis - 1,
      );

      const evaluators = this.type === "boolean"
        ? new BooleanExpressionEvaluator(this.scope)
        : new ArithmeticExpressionEvaluator(this.scope);

      for (const evaluator of evaluators.expressionEvaluators) {
        if (evaluator.tryEvaluate(insideExpression)) {
          const result = evaluator.evaluate(insideExpression)?.toString();
          return text.replace(`(${insideExpression})`, ` ${result} `);
        }
      }

      throw new Error(`Invalid ${this.type} expression`);
    } else {
      bugReporter.report(
        `EVALUATE_CALLED_ON_INVALID_${this.type.toUpperCase}_PARENTHESIS_BLOCK`,
      );
    }
  }
}
