// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Block } from "@/blocks/Block";
import { Scope } from "@/models/Scope";

import { OutputBuffer } from "@/models/OutputBuffer";

import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import { ArrayExpressionEvaluator } from "@/expression-evaluators/array-expression-evaluator";
// prettier-ignore
import {
  ArithmeticExpressionEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator";
import { StringExpressionEvaluator } from "@/expression-evaluators/string-expression-evaluator";
import { BooleanExpressionEvaluator } from "@/expression-evaluators/boolean-expressions/boolean-expression-evaluator";

export class DisplayBlock extends Block {
  scope: Scope;

  private readonly expressionEvaluators: ExpressionEvaluator[] = [];

  constructor(
    private values: string[],
    parentScope: Scope,
  ) {
    super();
    this.scope = parentScope;

    this.expressionEvaluators.push(new ArrayExpressionEvaluator(this.scope));
    this.expressionEvaluators.push(new BooleanExpressionEvaluator(this.scope));
    this.expressionEvaluators.push(
      new ArithmeticExpressionEvaluator(this.scope),
    );
    this.expressionEvaluators.push(new StringExpressionEvaluator(this.scope));
  }

  execute(): void {
    const outputBuffer = OutputBuffer.instance;

    for (const value of this.values) {
      let isLiteral = false;
      for (const evaluator of this.expressionEvaluators) {
        if (evaluator.tryEvaluate(value)) {
          isLiteral = true;
          const stringForm = evaluator.evaluate(value).toString();
          outputBuffer.push(stringForm);
          break;
        }
      }
      if (isLiteral === false) {
        if (this.scope.hasVariable(value)) {
          const variable = this.scope.getVariable(value);
          outputBuffer.push(variable.value.toString());
        } else {
          throw new Error("Cannot resolve symbol: " + value);
        }
      }
    }

    outputBuffer.push("\n");
  }
}
