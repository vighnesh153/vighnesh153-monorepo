/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Block } from '@/blocks/Block';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { Interpreter } from '@/interpreter';
import { BooleanExpressionEvaluator } from '@/expression-evaluators/boolean-expressions/boolean-expression-evaluator';

export class LoopWhileExpressionIsTrue extends Block {
  scope: Scope;

  constructor(
    private expression: string,
    parentScope: Scope,
    private childLinesOfCode: LineOfCode[]
  ) {
    super();
    this.scope = new Scope(parentScope);
  }

  execute(): void {
    const evaluator = new BooleanExpressionEvaluator(this.scope);

    const throwIfExpressionIsInvalid = () => {
      if (evaluator.tryEvaluate(this.expression) === false) {
        throw new Error('Invalid boolean expression.');
      }
    };

    throwIfExpressionIsInvalid();
    while (evaluator.evaluate(this.expression)) {
      try {
        new Interpreter(this.childLinesOfCode.slice(), this.scope.shallowClone()).interpret();
      } catch (e) {
        // @ts-ignore
        if (e.message === 'break') {
          break;
        }
        // @ts-ignore
        if (e.message === 'continue') {
          continue;
        }
        throw e;
      }
      throwIfExpressionIsInvalid();
    }
  }
}
