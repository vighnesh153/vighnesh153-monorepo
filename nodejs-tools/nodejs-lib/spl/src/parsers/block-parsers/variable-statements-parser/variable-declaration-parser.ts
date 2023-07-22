import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { BlockParser } from '@/parsers/block-parsers/block-parser';

import { Block } from '@/blocks/Block';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';
import { ArrayVariableBlock } from '@/blocks/variable-blocks/array-variable-block';

import { ExpressionEvaluator } from '@/expression-evaluators/expression-evaluator';
// prettier-ignore
import { 
  ArithmeticExpressionEvaluator,
} from '@/expression-evaluators/arithmetic-expressions/arithmetic-expression-evaluator';
import { BooleanExpressionEvaluator } from '@/expression-evaluators/boolean-expressions/boolean-expression-evaluator';
import { StringExpressionEvaluator } from '@/expression-evaluators/string-expression-evaluator';
import { ArrayExpressionEvaluator } from '@/expression-evaluators/array-expression-evaluator';

export class VariableDeclarationParser extends BlockParser {
  private readonly expressionEvaluators: { [key: string]: ExpressionEvaluator } = {};

  private static primitiveRegex = /^let\s* (\S*)\s* (\S*)\s* be\s* (.*)\s*$/;
  private static arrayRegex = /^let\s* array\s* of\s* (\S*)\s*,\s*(\S*)\s*,\s*be\s* (.*)$/;

  constructor(
    public scope: Scope,
    public lineOfCodes: LineOfCode[],
    public evaluationScope?: Scope
  ) {
    super();

    const scopeForEvaluation = evaluationScope ? (evaluationScope as Scope) : scope;

    this.expressionEvaluators.number = new ArithmeticExpressionEvaluator(scopeForEvaluation);
    this.expressionEvaluators.boolean = new BooleanExpressionEvaluator(scopeForEvaluation);
    this.expressionEvaluators.string = new StringExpressionEvaluator(scopeForEvaluation);
    this.expressionEvaluators.array = new ArrayExpressionEvaluator(scopeForEvaluation);
  }

  private tryParsePrimitive(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return VariableDeclarationParser.primitiveRegex.test(lineUnderTest.value);
  }

  private tryParseArray(): boolean {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];
    return VariableDeclarationParser.arrayRegex.test(lineUnderTest.value);
  }

  tryParse(): boolean {
    const isPrimitiveDeclaration = this.tryParsePrimitive();
    const isArrayDeclaration = this.tryParseArray();
    return isPrimitiveDeclaration || isArrayDeclaration;
  }

  parsePrimitive(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];

    const result = lineUnderTest.value.match(VariableDeclarationParser.primitiveRegex);
    if (result) {
      // eslint-disable-next-line prefer-destructuring
      const datatype = result[1];
      // eslint-disable-next-line prefer-destructuring
      const variableName = result[2];
      // eslint-disable-next-line prefer-destructuring
      const value = result[3];

      if (['number', 'string', 'boolean'].includes(datatype) === false) {
        if (datatype === 'array') {
          throw new Error(
            'Invalid datatype at line: ' +
              lineUnderTest.number +
              '\nType of array needs to be provided as: array of <TYPE>'
          );
        }
        throw new Error('Invalid datatype at line: ' + lineUnderTest.number);
      }

      const valueEvaluator = this.expressionEvaluators[datatype];

      if (valueEvaluator.tryEvaluate(value) === false) {
        throw new Error('Invalid value assigned to variable at line: ' + lineUnderTest.number);
      }

      // Remove the line as it is done parsing.
      this.lineOfCodes.pop();

      return new VariableBlock(
        VariableBlockType.declare,
        variableName,
        datatype,
        valueEvaluator.evaluate(value),
        false,
        this.scope
      );
    }
    throw new Error('Invalid statement. At line: ' + lineUnderTest.number);
  }

  parseArray(): Block {
    const lineUnderTest = this.lineOfCodes[this.lineOfCodes.length - 1];

    const result = lineUnderTest.value.match(VariableDeclarationParser.arrayRegex);
    if (result) {
      // eslint-disable-next-line prefer-destructuring
      const arrayType = result[1];
      // eslint-disable-next-line prefer-destructuring
      const variableName = result[2];
      // eslint-disable-next-line prefer-destructuring
      const value = result[3];

      if (['number', 'string', 'boolean'].includes(arrayType) === false) {
        throw new Error('Invalid datatype at line: ' + lineUnderTest.number);
      }

      const valueEvaluator = this.expressionEvaluators.array as ArrayExpressionEvaluator;

      if (valueEvaluator.tryEvaluate(value) === false) {
        throw new Error('Invalid value assigned to variable at line: ' + lineUnderTest.number);
      }

      const valueType = valueEvaluator.getType(value);
      if (valueType !== arrayType && valueType !== 'any') {
        throw new Error(
          `Datatype of variable doesn't match ` + 'with value assigned, at line: ' + lineUnderTest.number
        );
      }

      // Remove the line as it is done parsing.
      this.lineOfCodes.pop();

      return new ArrayVariableBlock(
        VariableBlockType.declare,
        variableName,
        'array',
        valueEvaluator.evaluate(value),
        false,
        this.scope,
        arrayType
      );
    }
    throw new Error('Invalid statement. At line: ' + lineUnderTest.number);
  }

  parse(): Block {
    if (this.tryParsePrimitive()) {
      return this.parsePrimitive();
    }
    if (this.tryParseArray()) {
      return this.parseArray();
    }
    throw new Error(
      'Invalid variable declaration statement at line: ' + this.lineOfCodes[this.lineOfCodes.length - 1].number
    );
  }
}
