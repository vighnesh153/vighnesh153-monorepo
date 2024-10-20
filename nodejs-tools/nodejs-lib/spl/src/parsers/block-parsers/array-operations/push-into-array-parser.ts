/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BlockParser } from "@/parsers/block-parsers/block-parser";
import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { Block } from "@/blocks/Block";
import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
// prettier-ignore
import {
  ArithmeticExpressionEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator";
import { StringExpressionEvaluator } from "src/expression-evaluators/string-expression-evaluator";
import { BooleanExpressionEvaluator } from "src/expression-evaluators/boolean-expressions/boolean-expression-evaluator";

export class PushIntoArrayParser extends BlockParser {
  private static regex = /^push (.*) into (.*)$/;
  private readonly expressionEvaluators: { [key: string]: ExpressionEvaluator };

  constructor(
    public lineOfCodes: LineOfCode[],
    public scope: Scope,
  ) {
    super();

    this.expressionEvaluators = {
      string: new StringExpressionEvaluator(this.scope),
      number: new ArithmeticExpressionEvaluator(this.scope),
      boolean: new BooleanExpressionEvaluator(this.scope),
    };
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return PushIntoArrayParser.regex.test(lineUnderTest.value);
  }

  parse(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    const result = lineUnderTest.value.match(PushIntoArrayParser.regex);
    const { lineOfCodes } = this;

    if (result) {
      const valueString = result[1].trim();
      const arrayName = result[2].trim();

      if (this.scope.hasVariable(arrayName) === false) {
        throw new Error(`'${arrayName}' is undefined.`);
      }

      const variable = this.scope.getVariable(arrayName);
      if (variable.type !== "array") {
        throw new Error(`'${arrayName}' is not an array.`);
      }

      const typeOfData = variable.arrayType as string;
      const evaluator = this.expressionEvaluators[typeOfData];

      if (evaluator.tryEvaluate(valueString) === false) {
        throw new Error(`Cannot assign '${valueString}' to '${arrayName}'.`);
      }

      const value = evaluator.evaluate(valueString);

      return new (class extends Block {
        constructor(public scope: Scope) {
          super();
        }

        execute(): void {
          lineOfCodes.pop();
          // @ts-ignore
          variable.value.push(value);
        }
      })(this.scope);
    }

    throw new Error("Invalid statement.");
  }
}
