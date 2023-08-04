/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Scope } from '@/models/Scope';
import { bugReporter } from '@/language-bug-handling';
import { ArrayParser } from '@/parsers/data-type-parsers/non-primitive-parsers/array-parser';

import { ExpressionEvaluator } from '@/expression-evaluators/expression-evaluator';
// prettier-ignore
import { 
  ArithmeticExpressionEvaluator,
} from '@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator';
import { BooleanExpressionEvaluator } from '@/expression-evaluators/boolean-expressions/boolean-expression-evaluator';
import { StringExpressionEvaluator } from '@/expression-evaluators/string-expression-evaluator';
import { csvSplit } from '@/helpers/csv-split';
import { FunctionExpressionEvaluator } from '@/expression-evaluators/function-expression-evaluator';

export class ArrayExpressionEvaluator extends ExpressionEvaluator {
  private static arrayParser = ArrayParser.instance;
  private readonly expressionEvaluators: ExpressionEvaluator[] = [];

  private readonly functionExpressionEvaluator: FunctionExpressionEvaluator;

  private types: { [key: number]: string } = {
    0: 'number',
    1: 'boolean',
    2: 'string',
  };

  constructor(public scope: Scope) {
    super();

    // Order important. If want to change order,
    // change the this.types property as well.
    this.expressionEvaluators.push(new ArithmeticExpressionEvaluator(this.scope));
    this.expressionEvaluators.push(new BooleanExpressionEvaluator(this.scope));
    this.expressionEvaluators.push(new StringExpressionEvaluator(this.scope));

    this.functionExpressionEvaluator = new FunctionExpressionEvaluator(this.scope);
  }

  getType(text: string): string {
    if (this.tryEvaluate(text) === false) {
      throw new Error('Invalid array type.');
    }
    const array = this.evaluate(text);
    if (array?.length === 0) {
      return 'any';
    }
    if (array?.[0]?.toString() === array?.[0]) {
      return 'string';
    }
    // @ts-ignore
    if (JSON.parse(array?.[0]) === true || JSON.parse(array?.[0]) === false) {
      return 'boolean';
    }
    return 'number';
  }

  private tryParseExpressionBasedArray(text: string): boolean {
    const trimmed = text.trim();

    if (this.functionExpressionEvaluator.tryEvaluate(text)) {
      return true;
    }

    if (trimmed.startsWith('[') === false || trimmed.endsWith(']') === false) {
      return false;
    }

    // Remove the start and end brackets
    const innerContent = trimmed.slice(1, trimmed.length - 1).trim();

    const arrayElements = csvSplit(innerContent);

    let type: string = 'any';
    let isArrayValid = true;
    arrayElements.forEach((element) => {
      if (isArrayValid === false) return;
      let parsedByAny = false;

      this.expressionEvaluators.forEach((evaluator, index) => {
        if (isArrayValid === false) return;

        if (evaluator.tryEvaluate(element) && parsedByAny === false) {
          if (type === 'any') {
            type = this.types[index];
          } else if (type !== this.types[index]) {
            isArrayValid = false;
          }
          parsedByAny = true;
        }
      });

      if (parsedByAny === false) isArrayValid = false;
    });

    return isArrayValid;
  }

  private parseExpressionBasedArray(text: string): unknown[] {
    let trimmed = text.trim();

    if (this.functionExpressionEvaluator.tryEvaluate(trimmed)) {
      trimmed = this.functionExpressionEvaluator.evaluate(trimmed);
    }

    // Remove the start and end brackets
    const innerContent = trimmed.slice(1, trimmed.length - 1).trim();
    const arrayElements = csvSplit(innerContent);

    const result: unknown[] = [];

    for (const element of arrayElements) {
      for (const evaluator of this.expressionEvaluators) {
        if (evaluator.tryEvaluate(element)) {
          result.push(evaluator.evaluate(element));
        }
      }
    }

    return result;
  }

  tryEvaluate(text: string): boolean {
    const trimmed = text.trim();
    if (ArrayExpressionEvaluator.arrayParser.tryParse(trimmed)) {
      return true;
    }
    if (this.tryParseExpressionBasedArray(trimmed)) {
      return true;
    }
    return this.scope.hasVariable(trimmed) && this.scope.getVariable(trimmed).type === 'array';
  }

  evaluate(text: string): unknown[] | undefined {
    if (this.tryEvaluate(text)) {
      if (ArrayExpressionEvaluator.arrayParser.tryParse(text)) {
        return ArrayExpressionEvaluator.arrayParser.parse(text);
      }
      if (this.tryParseExpressionBasedArray(text)) {
        return this.parseExpressionBasedArray(text);
      }
      return this.scope.getVariable(text.trim()).value;
    } else {
      bugReporter.report('EVALUATING_INVALID_STRING');
    }
  }
}
