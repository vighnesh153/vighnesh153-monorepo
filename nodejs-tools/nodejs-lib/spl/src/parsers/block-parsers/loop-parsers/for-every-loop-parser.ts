import { BlockParser } from "@/parsers/block-parsers/block-parser";
import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { Block } from "@/blocks/Block";
import { ArrayExpressionEvaluator } from "@/expression-evaluators/array-expression-evaluator";
import { ArrayVariableBlock } from "@/blocks/variable-blocks/array-variable-block";
import { VariableBlockType } from "@/blocks/variable-blocks/variable-block";
import { ForEveryLoop } from "@/blocks/loop-blocks/for-every-loop";

export class ForEveryLoopParser extends BlockParser {
  private static withoutIndexRegex = /^for\s* every (.*) in (.*):\s*$/;
  private static withIndexRegex =
    /^for every (.*) in (.*) with (.*) as\s* index\s*:\s*$/;

  constructor(
    public lineOfCodes: LineOfCode[],
    public scope: Scope,
  ) {
    super();
  }

  private isForEachLoop(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return ForEveryLoopParser.withoutIndexRegex.test(lineUnderTest.value);
  }

  private isEnumeratorLoop(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return ForEveryLoopParser.withIndexRegex.test(lineUnderTest.value);
  }

  tryParse(): boolean {
    const isEnumeratorLoop = this.isEnumeratorLoop();
    const isForEachLoop = this.isForEachLoop();
    return isForEachLoop || isEnumeratorLoop;
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

  private static getRandomString(): string {
    const n1 = Math.floor(Math.random() * Math.pow(10, 10));
    const n2 = Math.floor(Math.random() * Math.pow(10, 10));
    const n3 = Math.floor(Math.random() * Math.pow(10, 10));
    return `_${n1}_array_${n2}_array_${n3}`;
  }

  private parseForEachLoop(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(
      ForEveryLoopParser.withoutIndexRegex,
    );

    if (result) {
      const elementName = result[1];
      const arrayExpression = result[2];
      const evaluator = new ArrayExpressionEvaluator(this.scope);

      if (evaluator.tryEvaluate(arrayExpression) === false) {
        throw new Error(`'${arrayExpression}' is not a valid array.`);
      }

      const nameOfArray = ForEveryLoopParser.getRandomString();
      const newScope = this.scope.shallowClone();

      const array = evaluator.evaluate(arrayExpression);
      const arrayBlock = new ArrayVariableBlock(
        VariableBlockType.declare,
        nameOfArray,
        "array",
        array,
        false,
        newScope,
        evaluator.getType(JSON.stringify(array)),
      );
      arrayBlock.execute();

      this.lineOfCodes.pop();

      return new ForEveryLoop(
        elementName,
        newScope,
        this.getIndentedBlock(),
        nameOfArray,
      );
    }

    throw new Error("Invalid statement");
  }

  private parseEnumeratorLoop(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(ForEveryLoopParser.withIndexRegex);

    if (result) {
      const elementName = result[1];
      const arrayExpression = result[2];
      const indexName = result[3];

      const evaluator = new ArrayExpressionEvaluator(this.scope);

      if (evaluator.tryEvaluate(arrayExpression) === false) {
        throw new Error(`'${arrayExpression}' is not a valid array.`);
      }

      const nameOfArray = ForEveryLoopParser.getRandomString();
      const newScope = this.scope.shallowClone();

      const array = evaluator.evaluate(arrayExpression);
      const arrayBlock = new ArrayVariableBlock(
        VariableBlockType.declare,
        nameOfArray,
        "array",
        array,
        false,
        newScope,
        evaluator.getType(JSON.stringify(array)),
      );
      arrayBlock.execute();

      this.lineOfCodes.pop();

      return new ForEveryLoop(
        elementName,
        newScope,
        this.getIndentedBlock(),
        nameOfArray,
        indexName,
      );
    }

    throw new Error("Invalid statement");
  }

  parse(): Block {
    if (this.isEnumeratorLoop()) {
      return this.parseEnumeratorLoop();
    }
    if (this.isForEachLoop()) {
      return this.parseForEachLoop();
    }
    throw new Error("Invalid statement");
  }
}
