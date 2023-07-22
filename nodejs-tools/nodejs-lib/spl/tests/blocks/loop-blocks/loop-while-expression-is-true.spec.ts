import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { OutputBuffer } from '@/models/OutputBuffer';
import { LoopWhileExpressionIsTrue } from '@/blocks/loop-blocks/loop-while-expression-is-true';
import { VariableBlock, VariableBlockType } from '@/blocks/variable-blocks/variable-block';

describe('check the functionality of loop while expression is true', () => {
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  let block: LoopWhileExpressionIsTrue;
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [];

    const variableBlock = new VariableBlock(VariableBlockType.declare, 'x', 'number', 0, false, scope);
    variableBlock.execute();
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, Math.random()));
  };

  test('should print something while expression is true', () => {
    addLineOfCode(`    display 'Hello'`);
    addLineOfCode('    set x to x + 1');

    block = new LoopWhileExpressionIsTrue('x < 5', scope, linesOfCode);
    block.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('Hello\nHello\nHello\nHello\nHello\n');
  });
});
