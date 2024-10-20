/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { BlockParser } from "@/parsers/block-parsers/block-parser";
// prettier-ignore
import {
  VariableDeclarationParser,
} from "@/parsers/block-parsers/variable-statements-parser/variable-declaration-parser";
// prettier-ignore
import {
  VariableModificationParser,
} from "@/parsers/block-parsers/variable-statements-parser/variable-modification-parser";
import { DisplayStatementsParser } from "@/parsers/block-parsers/display-statements-parser";
import { ConditionalBlockParser } from "@/parsers/block-parsers/conditional-block-parser";
import { LoopForXTimesParser } from "@/parsers/block-parsers/loop-parsers/loop-for-x-times-parser";
// prettier-ignore
import {
  LoopWhileExpressionIsTrueParser,
} from "@/parsers/block-parsers/loop-parsers/loop-while-expression-is-true-parser";
import { ForEveryLoopParser } from "@/parsers/block-parsers/loop-parsers/for-every-loop-parser";
import { ReturnParser } from "@/parsers/block-parsers/functions/return-parser";
import { FunctionExecutionParser } from "@/parsers/block-parsers/functions/function-execution-parser";
import { FunctionDefinitionBlockParser } from "@/parsers/block-parsers/functions/function-definition-block-parser";
import { BreakStatementParser } from "@/parsers/block-parsers/loop-parsers/break-statement-parser";
import { ContinueStatementParser } from "@/parsers/block-parsers/loop-parsers/continue-statement-parser";
import { PopFromArrayParser } from "@/parsers/block-parsers/array-operations/pop-from-array-parser";
import { PushIntoArrayParser } from "@/parsers/block-parsers/array-operations/push-into-array-parser";

/*
 *  Note: When instantiating the interpreter for the first time
 *        in the main file, DONT FORGET TO ADD THE LINES OF CODE IN
 *        REVERSED ORDER BECAUSE PROCESSING BEGINS FROM THE END.
 */

export class Interpreter {
  private readonly blockParsers: BlockParser[] = [];

  private createCopyOfLinesOfCode(): void {
    const copy: LineOfCode[] = [];
    for (const loc of this.linesOfCode) {
      const newLoc = new LineOfCode(loc.value, loc.number);
      copy.push(newLoc);
    }
    this.linesOfCode = copy;
  }

  constructor(
    private linesOfCode: LineOfCode[],
    private scope: Scope,
  ) {
    this.createCopyOfLinesOfCode();

    this.blockParsers.push(
      new PushIntoArrayParser(this.linesOfCode, this.scope),
    );
    this.blockParsers.push(
      new PopFromArrayParser(this.linesOfCode, this.scope),
    );

    this.blockParsers.push(
      new FunctionExecutionParser(this.scope, this.linesOfCode),
    );
    this.blockParsers.push(
      new FunctionDefinitionBlockParser(this.scope, this.linesOfCode),
    );
    this.blockParsers.push(new ReturnParser(this.scope, this.linesOfCode));

    this.blockParsers.push(
      new VariableDeclarationParser(this.scope, this.linesOfCode),
    );
    this.blockParsers.push(
      new VariableModificationParser(this.scope, this.linesOfCode),
    );
    this.blockParsers.push(
      new DisplayStatementsParser(this.scope, this.linesOfCode),
    );

    this.blockParsers.push(
      new ConditionalBlockParser(this.linesOfCode, this.scope),
    );

    this.blockParsers.push(
      new BreakStatementParser(this.scope, this.linesOfCode),
    );
    this.blockParsers.push(
      new ContinueStatementParser(this.scope, this.linesOfCode),
    );
    this.blockParsers.push(
      new LoopForXTimesParser(this.linesOfCode, this.scope),
    );
    this.blockParsers.push(
      new LoopWhileExpressionIsTrueParser(this.linesOfCode, this.scope),
    );
    this.blockParsers.push(
      new ForEveryLoopParser(this.linesOfCode, this.scope),
    );
  }

  interpret(): void {
    if (this.linesOfCode.length === 0) {
      return;
    }

    {
      const lastLine = this.linesOfCode[this.linesOfCode.length - 1];
      if (lastLine.isInBlock()) {
        this.linesOfCode.forEach((line) => line.decreaseBlockLevel());
      }
    }

    while (this.linesOfCode.length > 0) {
      const countOfLinesBeforeParsing = this.linesOfCode.length;
      const lineUnderExecution =
        this.linesOfCode[this.linesOfCode.length - 1].number;

      for (const parser of this.blockParsers) {
        if (parser.tryParse()) {
          try {
            const block = parser.parse();
            block.execute();
            break;
          } catch (e) {
            // @ts-ignore
            if (["return", "break", "continue"].includes(e.message)) {
              throw e;
            }
            // @ts-ignore
            if (e.message.includes("line:")) {
              // @ts-ignore
              throw new Error(e.message);
            } else {
              // @ts-ignore
              throw new Error(e.message + ". At line: " + lineUnderExecution);
            }
          }
        }
      }

      const countOfLinesAfterParsing = this.linesOfCode.length;

      if (countOfLinesBeforeParsing === countOfLinesAfterParsing) {
        const lastLine = this.linesOfCode[this.linesOfCode.length - 1];
        throw new Error("Error in statement at line: " + lastLine.number);
      }
    }
  }
}
