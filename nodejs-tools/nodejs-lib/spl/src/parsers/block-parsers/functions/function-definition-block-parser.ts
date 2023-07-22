import { BlockParser } from '@/parsers/block-parsers/block-parser';
import { LineOfCode } from '@/models/LineOfCode';
import { Scope } from '@/models/Scope';
import { Block } from '@/blocks/Block';
import { csvSplit } from '@/helpers/csv-split';
import { FunctionBlock } from '@/blocks/function-block';

export class FunctionDefinitionBlockParser extends BlockParser {
  private static regex = /^define\s* function\s* (.+) with\s* arguments\s* \[(.*)]\s* which\s* returns (.*):\s*$/;

  private static acceptedReturnTypes: string[] = [
    'nothing',
    'number',
    'string',
    'boolean',
    'array of boolean',
    'array of string',
    'array of number',
  ];

  constructor(
    public scope: Scope,
    public lineOfCodes: LineOfCode[]
  ) {
    super();
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const { regex } = FunctionDefinitionBlockParser;
    return regex.test(lineUnderTest.value);
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
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(FunctionDefinitionBlockParser.regex);

    if (result) {
      const funcName = result[1].trim();
      const argsString = result[2].trim();
      const returnType = result[3].trim();

      let args: string[] = [];
      if (argsString !== '') {
        args = csvSplit(argsString);
      }

      if (FunctionDefinitionBlockParser.acceptedReturnTypes.includes(returnType) === false) {
        throw new Error('Invalid return type.');
      }

      this.lineOfCodes.pop();
      const funcBlock = new FunctionBlock(
        funcName,
        args,
        this.getIndentedBlock(),
        this.scope,
        returnType !== 'nothing',
        returnType
      );

      return new (class extends Block {
        constructor(
          public scope: Scope,
          public lineOfCodes: LineOfCode[]
        ) {
          super();
        }

        execute(): void {
          FunctionBlock.define(funcBlock, this.scope);
        }
      })(this.scope, this.lineOfCodes);
    }

    throw new Error('Invalid statement.');
  }
}
