/* eslint-disable quotes */
import { BlockParser } from "@/parsers/block-parsers/block-parser";
import { Scope } from "@/models/Scope";
import { LineOfCode } from "@/models/LineOfCode";
import {
  VariableBlock,
  VariableBlockType,
} from "@/blocks/variable-blocks/variable-block";
import { ArrayVariableBlock } from "@/blocks/variable-blocks/array-variable-block";
// prettier-ignore
import {
  VariableModificationParser,
} from "@/parsers/block-parsers/variable-statements-parser/variable-modification-parser";

describe("should parse the matching modification statement.", () => {
  let blockParser: BlockParser;
  let scope: Scope;
  let linesOfCode: LineOfCode[];
  beforeEach(() => {
    scope = new Scope();
    linesOfCode = [new LineOfCode("", Math.random())];
    blockParser = new VariableModificationParser(scope, linesOfCode);
  });

  test("should return false if empty statement is passed.", () => {
    linesOfCode[0].value = "";

    const result = blockParser.tryParse();
    expect(result).toStrictEqual(false);
  });

  test.each([
    "   set a to 1", // Indentation
  ])(
    "should return false if incorrect statement is passed.",
    (input: string) => {
      linesOfCode[0].value = input;

      const result = blockParser.tryParse();
      expect(result).toStrictEqual(false);
    },
  );

  test.each(["set a to 111", "set A to [1, 2, 3]", "set  A[1] to -1"])(
    "should return true if correct statement is passed.",
    (input: string) => {
      linesOfCode[0].value = input;

      expect(blockParser.tryParse()).toStrictEqual(true);
    },
  );
});

describe(
  "should return correct block or " +
    "throw error if incorrect values are tried to assign for " +
    "primitive data types.",
  () => {
    let blockParser: BlockParser;
    let scope: Scope;
    let linesOfCode: LineOfCode[];
    beforeEach(() => {
      scope = new Scope();
      linesOfCode = [new LineOfCode("", Math.random())];
      blockParser = new VariableModificationParser(scope, linesOfCode);
    });

    const defineVariable = (name: string, value: unknown, type: string) => {
      const variableBlock = new VariableBlock(
        VariableBlockType.declare,
        name,
        type,
        value,
        false,
        scope,
      );
      variableBlock.execute();
    };

    test("should throw if variable is not defined.", () => {
      expect(() => {
        linesOfCode[0].value = "set s to 'Hello World!'";
        blockParser.parse();
      }).toThrow();
    });

    test("should return correct set block.", () => {
      defineVariable("s", "Hello world!", "string");
      expect(scope.getVariable("s").value).toStrictEqual("Hello world!");

      linesOfCode[0].value = "set s to 'vighnesh153'";

      const block = blockParser.parse() as VariableBlock;
      expect(block.value).toStrictEqual("vighnesh153");
      expect(block.variableName).toStrictEqual("s");
      expect(block.typeOfVariable).toStrictEqual("string");

      block.execute();

      expect(scope.getVariable("s").value).toStrictEqual("vighnesh153");
    });

    test("should throw if tried to set number to string.", () => {
      defineVariable("s", "Hello world!", "string");
      linesOfCode[0].value = "set s to 123";

      expect(() => {
        blockParser.parse();
      }).toThrow();
    });

    test("should throw if tried to set array to string.", () => {
      defineVariable("s", "Hello world!", "string");
      linesOfCode[0].value = "set s to ['a', 'b']";

      expect(() => {
        blockParser.parse();
      }).toThrow();
    });
  },
);

describe(
  "should assign values to array or " +
    "modify some of them or throw if error.",
  () => {
    let blockParser: BlockParser;
    let scope: Scope;
    let linesOfCode: LineOfCode[];
    beforeEach(() => {
      scope = new Scope();
      linesOfCode = [new LineOfCode("", Math.random())];
      blockParser = new VariableModificationParser(scope, linesOfCode);
    });

    const defineArray = (name: string, value: unknown, type: string) => {
      const variableBlock = new ArrayVariableBlock(
        VariableBlockType.declare,
        name,
        "array",
        value,
        false,
        scope,
        type,
      );
      variableBlock.execute();
    };

    it("should assign number array to the array that is of number type.", () => {
      defineArray("a", ["a", "b"], "string");
      linesOfCode[0].value = "set a to ['c', 'd']  ";

      const block = blockParser.parse() as VariableBlock;
      block.execute();

      expect(block.value).toStrictEqual(["c", "d"]);
      expect(block.variableName).toStrictEqual("a");
    });

    it("should update the element at index of array.", () => {
      defineArray("a", ["a", "b"], "string");
      linesOfCode[0].value = "set a[1] to 'c'  ";

      const block = blockParser.parse() as VariableBlock;
      block.execute();

      expect(block.value).toStrictEqual(["a", "c"]);
    });

    it("should throw error if no index is provided.", () => {
      defineArray("a", ["a", "b"], "string");
      linesOfCode[0].value = "set a[] to 'c'  ";

      expect(() => {
        blockParser.parse();
      }).toThrow();
    });

    it("should throw error if assigning different type of array.", () => {
      defineArray("a", ["a", "b"], "string");
      linesOfCode[0].value = "set a to [  1, 2]  ";

      expect(() => {
        blockParser.parse();
      }).toThrow();
    });

    it("should throw error if assigning non-array expression.", () => {
      defineArray("a", ["a", "b"], "string");
      linesOfCode[0].value = "set a to 'c'  ";

      expect(() => {
        blockParser.parse();
      }).toThrow();
    });

    it("should throw error if index out of bounds.", () => {
      defineArray("a", ["a", "b"], "string");
      linesOfCode[0].value = "set a[3] to 'c'  ";

      expect(() => {
        blockParser.parse();
      }).toThrow();
    });
  },
);
