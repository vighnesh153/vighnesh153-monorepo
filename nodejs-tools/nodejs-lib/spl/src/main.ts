import { preProcess } from "./pre-processing/pre-processor";
import { LineOfCode } from "./models/LineOfCode";
import { Interpreter } from "./interpreter";
import { globalScope } from "./global-scope";
import { OutputBuffer } from "./models/OutputBuffer";
import { Scope } from "./models/Scope";

export class Main {
  private linesOfCode: LineOfCode[];

  constructor(private code: string) {
    this.linesOfCode = [];
  }

  preProcess(): void {
    this.linesOfCode = preProcess(this.code);

    this.linesOfCode.forEach((loc) => {
      if (loc.isIndentationValid() === false) {
        throw new Error("Indentation is invalid at line: " + loc.number);
      }
    });
  }

  compile(scope?: Scope): void {
    try {
      this.preProcess();
      new Interpreter(
        this.linesOfCode.reverse(),
        scope ? (scope as Scope) : globalScope.shallowClone(),
      ).interpret();
    } catch (e) {
      // @ts-ignore
      OutputBuffer.instance.push(e.message);
    }
  }

  getOutput(): string {
    return OutputBuffer.instance.getAndFlush();
  }
}
