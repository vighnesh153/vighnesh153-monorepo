/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BlockParser } from '@/parsers/block-parsers/block-parser';
import { LineOfCode } from '@/models/LineOfCode';
import { Scope } from '@/models/Scope';
import { Block } from '@/blocks/Block';

export class PopFromArrayParser extends BlockParser {
  private static regex = /^pop\s* from (.*)$/;

  constructor(
    public lineOfCodes: LineOfCode[],
    public scope: Scope
  ) {
    super();
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return PopFromArrayParser.regex.test(lineUnderTest.value);
  }

  parse(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(PopFromArrayParser.regex);
    const { lineOfCodes } = this;

    if (result) {
      const arrayName = result[1].trim();

      if (this.scope.hasVariable(arrayName) === false) {
        throw new Error(`'${arrayName}' is undefined.`);
      }

      const variable = this.scope.getVariable(arrayName);
      if (variable.type !== 'array') {
        throw new Error(`'${arrayName}' is not an array.`);
      }

      return new (class extends Block {
        constructor(public scope: Scope) {
          super();
        }

        execute(): void {
          lineOfCodes.pop();
          // @ts-ignore
          if (variable.value.length > 0) {
            // @ts-ignore
            variable.value.pop();
          }
        }
      })(this.scope);
    }

    throw new Error('Invalid statement.');
  }
}
