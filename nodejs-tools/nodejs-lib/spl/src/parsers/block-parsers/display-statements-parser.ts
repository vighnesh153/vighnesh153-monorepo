import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { BlockParser } from '@/parsers/block-parsers/block-parser';

import { Block } from '@/blocks/Block';
import { DisplayBlock } from '@/blocks/display-block';
import { csvSplit } from '@/helpers/csv-split';

export class DisplayStatementsParser extends BlockParser {
  private static regex = /^display\s* (.*)$/;

  constructor(
    public scope: Scope,
    public lineOfCodes: LineOfCode[]
  ) {
    super();
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return DisplayStatementsParser.regex.test(lineUnderTest.value.trimRight());
  }

  parse(): Block {
    if (this.tryParse()) {
      const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];

      const result = lineUnderTest.value.trimRight().match(DisplayStatementsParser.regex);
      if (result) {
        // Remove the line as it is done parsing.
        this.lineOfCodes.pop();

        const values = csvSplit(result[1]);
        return new DisplayBlock(values, this.scope);
      }

      throw new Error(
        `Display statement can't be empty. At line: ` + this.lineOfCodes[this.lineOfCodes.length - 1].number
      );
    }
    throw new Error(
      'There is some error in display statement at line: ' + this.lineOfCodes[this.lineOfCodes.length - 1].number
    );
  }
}
