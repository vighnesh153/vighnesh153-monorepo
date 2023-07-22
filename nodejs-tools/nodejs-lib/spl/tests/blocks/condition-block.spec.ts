import { ConditionBlock } from '@/blocks/condition-block';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';
import { OutputBuffer } from '@/models/OutputBuffer';

describe('check the functionality of the conditional block.', () => {
  let scope: Scope;
  let conditions: string[];
  let blocks: LineOfCode[][];
  let conditionBlock: ConditionBlock;
  beforeEach(() => {
    scope = new Scope();
    conditions = [];
    blocks = [];
  });

  const addCondition = (condition: string) => conditions.push(condition);
  const addBlock = (block: string[]) => {
    const newBlock: LineOfCode[] = [];
    block.forEach((b) => {
      newBlock.push(new LineOfCode(b, Math.random()));
    });
    blocks.push(newBlock);
  };

  test('should throw error if any block is empty', () => {
    addCondition('1 < 2');

    expect(() => {
      conditionBlock = new ConditionBlock(conditions, blocks, scope);
    }).toThrow();
  });

  test('should not run the block if condition is not true', () => {
    addCondition('1 > 2');
    addBlock([`display 'This will not be in output'`]);

    conditionBlock = new ConditionBlock(conditions, blocks, scope);
    conditionBlock.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('');
  });

  test('should run the block if condition is true', () => {
    addCondition('1 < 2');
    addBlock([`display 'Yay. This works!'`]);

    conditionBlock = new ConditionBlock(conditions, blocks, scope);
    conditionBlock.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('Yay. This works!\n');
  });

  test('should run the else block if no condition evaluates to true', () => {
    addCondition('1 > 2');
    addBlock([`display 'This will not be displayed'`]);
    addCondition('true'); // else block
    addBlock([`display 'from the else block'`]);

    conditionBlock = new ConditionBlock(conditions, blocks, scope);
    conditionBlock.execute();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual('from the else block\n');
  });
});
