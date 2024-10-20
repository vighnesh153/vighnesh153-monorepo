/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BlockParser } from "src/parsers/block-parsers/block-parser";
import { LineOfCode } from "src/models/LineOfCode";
import { Scope } from "src/models/Scope";
import { Block } from "src/blocks/Block";
// prettier-ignore
import {
  ArithmeticExpressionEvaluator,
} from "src/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator";
import { LoopForXTimes } from "src/blocks/loop-blocks/loop-for-x-times";

export class LoopForXTimesParser extends BlockParser {
  private static withoutCounterRegex = /^loop\s* for (.*) times\s*:\s*$/;
  private static withCounterRegex =
    /^loop\s* for (.*) times\s* with (.*) as\s* counter\s*:\s*$/;

  constructor(
    public lineOfCodes: LineOfCode[],
    public scope: Scope,
  ) {
    super();
  }

  isNoCounterLoop(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return LoopForXTimesParser.withoutCounterRegex.test(lineUnderTest.value);
  }

  isCounterLoop(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return LoopForXTimesParser.withCounterRegex.test(lineUnderTest.value);
  }

  tryParse(): boolean {
    const isCounterLoop = this.isCounterLoop();
    const isNoCounterLoop = this.isNoCounterLoop();
    return isCounterLoop || isNoCounterLoop;
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

  parseNoCounterLoop(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(
      LoopForXTimesParser.withoutCounterRegex,
    );

    if (result) {
      // eslint-disable-next-line prefer-destructuring
      const countString = result[1];
      const evaluator = new ArithmeticExpressionEvaluator(this.scope);

      if (evaluator.tryEvaluate(countString)) {
        const count = evaluator.evaluate(countString);
        this.lineOfCodes.pop();

        // @ts-ignore
        return new LoopForXTimes(count, this.scope, this.getIndentedBlock());
      }
    }

    throw new Error("Invalid statement");
  }

  parseCounterLoop(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(
      LoopForXTimesParser.withCounterRegex,
    );

    if (result) {
      // eslint-disable-next-line prefer-destructuring
      const countString = result[1];
      // eslint-disable-next-line prefer-destructuring
      const variableName = result[2];
      const evaluator = new ArithmeticExpressionEvaluator(this.scope);

      if (evaluator.tryEvaluate(countString)) {
        const count = evaluator.evaluate(countString);
        this.lineOfCodes.pop();

        // @ts-ignore
        return new LoopForXTimes(
          count,
          this.scope,
          this.getIndentedBlock(),
          variableName,
        );
      }
    }

    throw new Error("Invalid statement");
  }

  parse(): Block {
    if (this.isCounterLoop()) {
      return this.parseCounterLoop();
    }
    if (this.isNoCounterLoop()) {
      return this.parseNoCounterLoop();
    }
    throw new Error("Invalid statement");
  }
}
