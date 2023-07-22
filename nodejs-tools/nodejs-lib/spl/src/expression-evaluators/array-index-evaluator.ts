/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ExpressionEvaluator } from '@/expression-evaluators/expression-evaluator';
import { Scope } from '@/models/Scope';
// prettier-ignore
import { 
  ArithmeticExpressionEvaluator,
} from 'src/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator';

export class ArrayIndexEvaluator extends ExpressionEvaluator {
  private static regex = /^(.+)\[(.*)]$/;

  constructor(
    public scope: Scope,
    public arrayType: string
  ) {
    super();
  }

  getType(text: string): string {
    const result = text.match(ArrayIndexEvaluator.regex);

    if (result) {
      const arrayName = result[1].trim();

      if (this.scope.hasVariable(arrayName) === false) {
        return '';
      }

      if (this.scope.getVariable(arrayName).type !== 'array') {
        return '';
      }

      return this.scope.getVariable(arrayName).arrayType as string;
    }
    return '';
  }

  tryEvaluate(text: string): boolean {
    return this.getType(text.trim()) === this.arrayType;
  }

  evaluate(text: string): unknown {
    const result = text.trim().match(ArrayIndexEvaluator.regex);

    if (result) {
      const arrayName = result[1].trim();
      // eslint-disable-next-line prefer-destructuring
      const indexString = result[2];

      const evaluator = new ArithmeticExpressionEvaluator(this.scope);
      if (evaluator.tryEvaluate(indexString) === false) {
        throw new Error('Invalid index.');
      }

      const index = evaluator.evaluate(indexString);
      const variable = this.scope.getVariable(arrayName);

      // @ts-ignore
      if (index < 0 || index >= variable.value.length) {
        throw new Error('Index out of bounds.');
      }
      // @ts-ignore
      return variable.value[index];
    }
    throw new Error('Invalid statement.');
  }
}
