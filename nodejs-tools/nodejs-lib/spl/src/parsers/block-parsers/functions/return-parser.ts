import { BlockParser } from '@/parsers/block-parsers/block-parser';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { Block } from '@/blocks/Block';
import { ReturnError } from '@/models/ReturnError';

export class ReturnParser extends BlockParser {
  private static regex = /^return (.*)$/;

  constructor(
    public scope: Scope,
    public lineOfCodes: LineOfCode[]
  ) {
    super();
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return ReturnParser.regex.test(lineUnderTest.value) || lineUnderTest.value.trimRight() === 'return';
  }

  parse(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(ReturnParser.regex);

    if (this.tryParse()) {
      const expression = result ? result[1] : '';
      const linesOfCode = this.lineOfCodes;
      return new (class extends Block {
        constructor(
          public scope: Scope,
          public lineOfCodes: LineOfCode[]
        ) {
          super();
        }

        execute(): void {
          const error = new ReturnError('return', this.scope, expression);
          linesOfCode.pop();
          throw error;
        }
      })(this.scope, this.lineOfCodes);
    }

    throw new Error('Invalid return statement');
  }
}
