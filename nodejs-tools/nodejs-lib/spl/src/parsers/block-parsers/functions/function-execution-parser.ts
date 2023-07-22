import { BlockParser } from '@/parsers/block-parsers/block-parser';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { Block } from '@/blocks/Block';
import { FunctionExpressionEvaluator } from '@/expression-evaluators/function-expression-evaluator';

export class FunctionExecutionParser extends BlockParser {
  private static regex = /^execute (.*)\((.*)\)\s*$/;

  constructor(
    public scope: Scope,
    public lineOfCodes: LineOfCode[]
  ) {
    super();
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return FunctionExecutionParser.regex.test(lineUnderTest.value.trim());
  }

  parse(): Block {
    const evaluator = new FunctionExpressionEvaluator(this.scope);
    const { lineOfCodes } = this;
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];

    return new (class extends Block {
      constructor(public scope: Scope) {
        super();
      }

      execute(): void {
        try {
          lineOfCodes.pop();
          evaluator.evaluate(lineUnderTest.value.replace('execute', 'result of'));
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (e.message !== 'Function returns nothing according to definition.') {
            throw e;
          }
        }
      }
    })(this.scope);
  }
}
