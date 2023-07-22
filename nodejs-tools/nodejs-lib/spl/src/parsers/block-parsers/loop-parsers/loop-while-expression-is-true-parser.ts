import { BlockParser } from '@/parsers/block-parsers/block-parser';
import { LineOfCode } from '@/models/LineOfCode';
import { Scope } from '@/models/Scope';
import { Block } from '@/blocks/Block';
import { LoopWhileExpressionIsTrue } from '@/blocks/loop-blocks/loop-while-expression-is-true';

export class LoopWhileExpressionIsTrueParser extends BlockParser {
  private static regex = /^loop\s* while (.*):\s*$/;

  constructor(
    public lineOfCodes: LineOfCode[],
    public scope: Scope
  ) {
    super();
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return LoopWhileExpressionIsTrueParser.regex.test(lineUnderTest.value);
  }

  private getIndentedBlock(): LineOfCode[] {
    const block: LineOfCode[] = [];
    while (this.lineOfCodes.length > 0) {
      const lastLine = this.lineOfCodes[this.lineOfCodes.length - 1];
      if (lastLine.isInBlock()) {
        block.push(lastLine);
        this.lineOfCodes.pop();
      } else {
        break;
      }
    }
    return block.reverse();
  }

  parse(): Block {
    if (this.tryParse()) {
      const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
      const { regex } = LoopWhileExpressionIsTrueParser;
      const result = lineUnderTest.value.match(regex);

      if (result) {
        // eslint-disable-next-line prefer-destructuring
        const expression = result[1];
        this.lineOfCodes.pop();
        return new LoopWhileExpressionIsTrue(expression, this.scope, this.getIndentedBlock());
      }
    }
    throw new Error('Invalid statement');
  }
}
