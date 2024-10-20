/* eslint-disable quotes */
import { Interpreter } from "@/interpreter";
import { LineOfCode } from "@/models/LineOfCode";
import { Scope } from "@/models/Scope";
import { OutputBuffer } from "@/models/OutputBuffer";

describe("check the functionality of variable and display parsers.", () => {
  let linesOfCode: LineOfCode[];
  let scope: Scope;
  let interpreter: Interpreter;
  let lineNumber: number;
  beforeEach(() => {
    linesOfCode = [];
    scope = new Scope();
    lineNumber = 1;
    interpreter = new Interpreter(linesOfCode, scope);
  });

  const addLineOfCode = (line: string) => {
    linesOfCode.push(new LineOfCode(line, lineNumber++));
  };

  test("should set the variables.", () => {
    addLineOfCode("let number a be 123");
    addLineOfCode("let string b be 'vighnesh'");
    addLineOfCode("let boolean c be true");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    expect(scope.hasVariable("a")).toStrictEqual(true);
    expect(scope.hasVariable("b")).toStrictEqual(true);
    expect(scope.hasVariable("c")).toStrictEqual(true);

    expect(scope.getVariable("a").value).toStrictEqual(123);
    expect(scope.getVariable("b").value).toStrictEqual("vighnesh");
    expect(scope.getVariable("c").value).toStrictEqual(true);
  });

  test("should add to the output buffer.", () => {
    addLineOfCode("let number a be 123");
    addLineOfCode("let string b be 'vighnesh'");
    addLineOfCode("let boolean c be true");
    addLineOfCode("display a");
    addLineOfCode("display b");
    addLineOfCode("display c");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const output = OutputBuffer.instance.getAndFlush();
    expect(output).toStrictEqual("123\nvighnesh\ntrue\n");
  });

  test("should modify the existing variable and output.", () => {
    addLineOfCode("let number a be 123");
    addLineOfCode("set a to 153");
    addLineOfCode("display a");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const output = OutputBuffer.instance.getAndFlush();
    expect(output).toStrictEqual("153\n");
  });

  test("should loop over numbers and print just the even numbers.", () => {
    addLineOfCode("let number a be 0");
    addLineOfCode("loop while a < 10:");
    addLineOfCode("    if a%2 == 0, then do:");
    addLineOfCode("        display a");
    addLineOfCode("    set a to a + 1");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const output = OutputBuffer.instance.getAndFlush();
    expect(output).toStrictEqual("0\n2\n4\n6\n8\n");
  });

  test("should loop over array and print just the multiples of 3.", () => {
    addLineOfCode(
      "let array of number, arr, be " +
        "[1 ,2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]",
    );
    addLineOfCode("for every elem in arr:");
    addLineOfCode("    if elem%3 == 0, then do:");
    addLineOfCode("        display elem");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const output = OutputBuffer.instance.getAndFlush();
    expect(output).toStrictEqual("3\n6\n9\n12\n");
  });

  test("should use the add function to add numbers.", () => {
    addLineOfCode(
      "define function add with arguments " +
        "[ number a, number b ] which returns number:",
    );
    addLineOfCode("    return a + b");
    addLineOfCode("let number c be result of add(3, 13)");
    addLineOfCode("let number a be result of add((c), 14)");
    addLineOfCode("display a");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const output = OutputBuffer.instance.getAndFlush();
    expect(output).toStrictEqual("30\n");
  });

  test("should perform recursion to find the factorial of a number.", () => {
    addLineOfCode(
      "define function factorial with " +
        "arguments [number n] which returns number:",
    );
    addLineOfCode("    if n == 1, then do:");
    addLineOfCode("        return 1");
    addLineOfCode(
      "    let number nMinus1Factorial be result of factorial(n - 1)",
    );
    addLineOfCode("    return n * nMinus1Factorial");
    addLineOfCode("let number fiveFactorial be result of factorial(5)");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    expect(scope.hasVariable("fiveFactorial")).toStrictEqual(true);
    const variable = scope.getVariable("fiveFactorial");
    expect(variable.value).toStrictEqual(120);
  });

  test("should break out of the loop if needed.", () => {
    addLineOfCode("for every item in [1, 2, 3, 4, 5]:");
    addLineOfCode("    if item > 2, then do:");
    addLineOfCode("        break");
    addLineOfCode("    display item");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n2\n");
  });

  test("should continue the loop from next iteration.", () => {
    addLineOfCode("for every item in [1, 2, 3, 4, 5]:");
    addLineOfCode("    if item == 2, then do:");
    addLineOfCode("        continue");
    addLineOfCode("    display item");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n3\n4\n5\n");
  });

  test("should correctly index elements from array.", () => {
    addLineOfCode(`let array of number, arr, be [1, 22, 333, 4444, 55555]`);
    addLineOfCode("for every item in [1, 2, 3, 4, 5]:");
    addLineOfCode("    display arr[item - 1]");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n22\n333\n4444\n55555\n");
  });

  test("should correctly pop element from array.", () => {
    addLineOfCode(`let array of number, arr, be [1, 22, 333, 4444, 55555]`);
    addLineOfCode(`pop from arr`);
    addLineOfCode(`pop from arr`);
    addLineOfCode("for every item in arr:");
    addLineOfCode("    display item");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n22\n333\n");
  });

  test("should correctly push elements into array.", () => {
    addLineOfCode(`let array of number, arr, be [1, 22, 333]`);
    addLineOfCode(`push 4440 + 4 into arr`);
    addLineOfCode(`push 5 * 11111 * arr[0] into arr`);
    addLineOfCode("for every item in arr:");
    addLineOfCode("    display item");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("1\n22\n333\n4444\n55555\n");
  });

  test("should correctly find the length of the array.", () => {
    addLineOfCode(`let array of number, arr, be [1, 22, 333, 4444]`);
    addLineOfCode(`let number size be length of arr`);
    addLineOfCode("display size");
    linesOfCode.reverse();

    interpreter = new Interpreter(linesOfCode, scope);
    interpreter.interpret();

    const result = OutputBuffer.instance.getAndFlush();
    expect(result).toStrictEqual("4\n");
  });
});
