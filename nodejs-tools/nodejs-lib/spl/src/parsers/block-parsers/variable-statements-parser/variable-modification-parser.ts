import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import { BlockParser } from "@/parsers/block-parsers/block-parser";

import { Block } from "@/blocks/Block";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

import { ExpressionEvaluator } from "@/expression-evaluators/expression-evaluator";
import {
  ArithmeticExpressionEvaluator,
} from "@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator";
import { BooleanExpressionEvaluator } from "@/expression-evaluators/boolean-expressions/boolean-expression-evaluator";
import { StringExpressionEvaluator } from "@/expression-evaluators/string-expression-evaluator";
import { ArrayExpressionEvaluator } from "@/expression-evaluators/array-expression-evaluator";

export class VariableModificationParser extends BlockParser {
  private readonly expressionEvaluators: {
    [key: string]: ExpressionEvaluator;
  } = {};
  private readonly primitiveExpressionEvaluators: ExpressionEvaluator[] = [];

  private readonly mapping: string[] = ["number", "boolean", "string"];

  private static regex = /^set\s* (\S*)\s* to\s* (.*)\s*$/;

  constructor(
    public scope: Scope,
    public lineOfCodes: LineOfCode[],
  ) {
    super();

    this.expressionEvaluators.number = new ArithmeticExpressionEvaluator(
      this.scope,
    );
    this.expressionEvaluators.boolean = new BooleanExpressionEvaluator(
      this.scope,
    );
    this.expressionEvaluators.string = new StringExpressionEvaluator(
      this.scope,
    );
    this.expressionEvaluators.array = new ArrayExpressionEvaluator(this.scope);

    // If order changes, change the order of this.mapping
    this.primitiveExpressionEvaluators.push(
      new ArithmeticExpressionEvaluator(this.scope),
    );
    this.primitiveExpressionEvaluators.push(
      new BooleanExpressionEvaluator(this.scope),
    );
    this.primitiveExpressionEvaluators.push(
      new StringExpressionEvaluator(this.scope),
    );
  }

  tryParse(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return VariableModificationParser.regex.test(lineUnderTest.value);
  }

  private modifyingArray(identifier: string, value: string): Block {
    const regexMatchResult = identifier.trim().match(
      /^([_a-zA-Z][_a-zA-Z0-9]*)\[(.+)]$/,
    );
    if (regexMatchResult) {
      const arrayName = regexMatchResult[1];
      if (arrayName === "") {
        throw new Error(
          "Invalid array name at line: " +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }
      const indexOfArrayAsString = regexMatchResult[2];
      let index: unknown;
      try {
        index = new ArithmeticExpressionEvaluator(this.scope).evaluate(
          indexOfArrayAsString,
        );
      } catch (e) {
        throw new Error(
          "Invalid index expression of array at line: " +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }

      if (this.scope.hasVariable(arrayName) === false) {
        throw new Error(
          `Array: ${arrayName} not found at line: ` +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }

      const array = this.scope.getVariable(arrayName);
      if (array.type !== "array") {
        throw new Error(
          `Variable: ${arrayName} is not an array at line: ` +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }

      // @ts-ignore
      if (index < 0 || index >= array.value.length) {
        throw new Error(
          `Index out of bounds exception at line: ` +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }

      let type: string = "NULL";
      for (let i = 0; i < this.primitiveExpressionEvaluators.length; i++) {
        const evaluator = this.primitiveExpressionEvaluators[i];
        if (evaluator.tryEvaluate(value)) {
          // @ts-ignore
          value = evaluator.evaluate(value);
          type = this.mapping[i];
          break;
        }
      }

      if (type === "NULL") {
        throw new Error(
          `Invalid value being assigned at line: ` +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }

      if (type !== array.arrayType) {
        throw new Error(
          `Inconsistent types at line: ` +
            this.lineOfCodes[this.lineOfCodes.length - 1].number,
        );
      }

      // @ts-ignore
      const newValues = [...array.value];
      // @ts-ignore
      newValues[index] = value;

      // Remove the line as it is done parsing.
      this.lineOfCodes.pop();

      return new VariableBlock(
        VariableBlockType.set,
        arrayName,
        array.type,
        newValues,
        false,
        this.scope,
      );
    }
    throw new Error(
      "Invalid modification of array at line: " +
        this.lineOfCodes[this.lineOfCodes.length - 1].number,
    );
  }

  parse(): Block {
    if (this.tryParse()) {
      const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];

      const result = lineUnderTest.value.match(
        VariableModificationParser.regex,
      );
      if (result) {
        const variableName = result[1];
        const value = result[2];

        if (/\[.*]$/.test(variableName)) {
          return this.modifyingArray(variableName, value);
        }

        if (this.scope.hasVariable(variableName.trim()) === false) {
          throw new Error(
            "Invalid identifier: " + variableName.trim() + " at line: " +
              lineUnderTest.number,
          );
        }

        const variable = this.scope.getVariable(variableName.trim());

        const valueEvaluator = this.expressionEvaluators[variable.type];

        if (valueEvaluator.tryEvaluate(value) === false) {
          throw new Error(
            "Invalid value assigned to variable at line: " +
              lineUnderTest.number,
          );
        }

        if (variable.type === "array") {
          const valueType = (valueEvaluator as ArrayExpressionEvaluator)
            .getType(value);
          if (valueType !== "any" && valueType !== variable.arrayType) {
            throw new Error(`Variable's type is different from value's type`);
          }
        }

        // Remove the line as it is done parsing.
        this.lineOfCodes.pop();

        return new VariableBlock(
          VariableBlockType.set,
          variableName,
          variable.type,
          valueEvaluator.evaluate(value),
          false,
          this.scope,
        );
      }
    }
    throw new Error(
      "Invalid variable modification statement at line: " +
        this.lineOfCodes[this.lineOfCodes.length - 1].number,
    );
  }
}
