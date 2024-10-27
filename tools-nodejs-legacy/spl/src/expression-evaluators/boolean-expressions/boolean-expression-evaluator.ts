import { Scope } from "@/models/Scope";
import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";

import { bugReporter } from "@/language-bug-handling";
import { BooleanParser } from "@/parsers/data-type-parsers/primitive-parsers/boolean-parser";

import { ParenthesisEvaluator } from "@/expression-evaluators/parenthesis-evaluator";
import { LogicalAnd } from "@/expression-evaluators/boolean-expressions/logical-and";
import { LogicalOr } from "@/expression-evaluators/boolean-expressions/logical-or";
import { DoubleEquals } from "@/expression-evaluators/boolean-expressions/double-equals";
import { NotEquals } from "@/expression-evaluators/boolean-expressions/not-equals";
import { GreaterThan } from "@/expression-evaluators/boolean-expressions/greater-than";
import { GreaterThanOrEqual } from "@/expression-evaluators/boolean-expressions/greater-than-or-equal";
import { LessThan } from "@/expression-evaluators/boolean-expressions/less-than";
import { LessThanOrEqual } from "@/expression-evaluators/boolean-expressions/less-than-or-equal";
import { BooleanEvaluator } from "@/expression-evaluators/boolean-expressions/boolean-evaluator";
import { FunctionExpressionEvaluator } from "@/expression-evaluators/function-expression-evaluator";

export class BooleanExpressionEvaluator extends ExpressionEvaluator {
  readonly expressionEvaluators: ExpressionEvaluator[];

  constructor(public scope: Scope) {
    super();
    this.expressionEvaluators = [];

    // Following order matters
    this.expressionEvaluators.push(new FunctionExpressionEvaluator(this.scope));

    this.expressionEvaluators.push(
      new ParenthesisEvaluator(this.scope, "boolean"),
    );

    this.expressionEvaluators.push(new DoubleEquals(this.scope));
    this.expressionEvaluators.push(new NotEquals(this.scope));
    this.expressionEvaluators.push(new GreaterThanOrEqual(this.scope));
    this.expressionEvaluators.push(new GreaterThan(this.scope));
    this.expressionEvaluators.push(new LessThanOrEqual(this.scope));
    this.expressionEvaluators.push(new LessThan(this.scope));

    this.expressionEvaluators.push(new LogicalAnd(this.scope));
    this.expressionEvaluators.push(new LogicalOr(this.scope));

    this.expressionEvaluators.push(new BooleanEvaluator(this.scope));
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
      const booleanParser = BooleanParser.instance;

      while (booleanParser.tryParse(text) === false) {
        let parsedByAny = false;
        for (const evaluator of this.expressionEvaluators) {
          if (evaluator.tryEvaluate(text)) {
            parsedByAny = true;
            text = "" + evaluator.evaluate(text);
            break;
          }
        }
        if (!parsedByAny) {
          throw new Error("Invalid boolean expression");
        }
      }

      return booleanParser.parse(text);
    } else {
      bugReporter.report("INVALID_BOOLEAN_EXPRESSION_EVALUATION");
    }
  }
}
