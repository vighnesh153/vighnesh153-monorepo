import { Scope } from "@/models/Scope";
import { Block } from "@/blocks/Block";

import { OutputBuffer } from "@/models/OutputBuffer";
import { DisplayBlock } from "@/blocks/display-block";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";

describe("check functionality of display block.", () => {
  const outputBuffer = OutputBuffer.instance;
  beforeEach(() => {
    outputBuffer.flush();
  });

  test(
    "should add newline character to output " +
      "buffer if input values array is empty.",
    () => {
      const values: string[] = [];
      const displayBlock: Block = new DisplayBlock(values, new Scope());
      displayBlock.execute();

      expect(outputBuffer.getAndFlush()).toStrictEqual("\n");
    },
  );

  test(
    "should add numbers to the output " +
      "buffer if numbers are passed as values array.",
    () => {
      const values: string[] = ["1", "344.4", "2453"];
      const displayBlock: Block = new DisplayBlock(values, new Scope());
      displayBlock.execute();

      expect(outputBuffer.getAndFlush()).toStrictEqual("1344.42453\n");
    },
  );

  test(
    "should add booleans to the output " +
      "buffer if booleans are passed as values array.",
    () => {
      const values: string[] = ["false", "true", "true"];
      const displayBlock: Block = new DisplayBlock(values, new Scope());
      displayBlock.execute();

      expect(outputBuffer.getAndFlush()).toStrictEqual("falsetruetrue\n");
    },
  );

  test(
    "should add strings to the output " +
      "buffer if strings are passed as values array.",
    () => {
      const values: string[] = ["'Hi. '", "'I am '", "'Vighnesh.'"];
      const displayBlock: Block = new DisplayBlock(values, new Scope());
      displayBlock.execute();

      expect(outputBuffer.getAndFlush()).toStrictEqual("Hi. I am Vighnesh.\n");
    },
  );

  test("should add mixed datatype values to the output buffer.", () => {
    const values: string[] = ["'Hi. '", "42", "true"];
    const displayBlock: Block = new DisplayBlock(values, new Scope());
    displayBlock.execute();

    expect(outputBuffer.getAndFlush()).toStrictEqual("Hi. 42true\n");
  });

  test("should add value of number variable to the output buffer.", () => {
    const values: string[] = ["someVariable"];
    const scope = new Scope();
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "number",
      4200,
      true,
      scope,
    );
    variableBlock.execute();
    const displayBlock: Block = new DisplayBlock(values, scope);
    displayBlock.execute();

    expect(outputBuffer.getAndFlush()).toStrictEqual("4200\n");
  });

  test("should add value of string variable to the output buffer.", () => {
    const values: string[] = ["someVariable"];
    const scope = new Scope();
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "string",
      "Hello, world!",
      true,
      scope,
    );
    variableBlock.execute();
    const displayBlock: Block = new DisplayBlock(values, scope);
    displayBlock.execute();

    expect(outputBuffer.getAndFlush()).toStrictEqual("Hello, world!\n");
  });

  test("should add value of boolean variable to the output buffer.", () => {
    const values: string[] = ["someVariable"];
    const scope = new Scope();
    const variableBlock = new VariableBlock(
      VariableBlockType.declare,
      "someVariable",
      "boolean",
      false,
      true,
      scope,
    );
    variableBlock.execute();
    const displayBlock: Block = new DisplayBlock(values, scope);
    displayBlock.execute();

    expect(outputBuffer.getAndFlush()).toStrictEqual("false\n");
  });

  test(
    "should add mixed datatype values along with " +
      "variable values to the output buffer.",
    () => {
      const scope = new Scope();
      const variableBlock = new VariableBlock(
        VariableBlockType.declare,
        "iAmAVariable",
        "string",
        "LoL",
        true,
        scope,
      );
      variableBlock.execute();

      const values: string[] = ["'Hi. '", "42", "true", "iAmAVariable"];
      const displayBlock: Block = new DisplayBlock(values, scope);
      displayBlock.execute();

      expect(outputBuffer.getAndFlush()).toStrictEqual("Hi. 42trueLoL\n");
    },
  );
});
