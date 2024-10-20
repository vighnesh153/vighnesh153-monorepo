import { preProcess } from "@/pre-processing/pre-processor";
import { LineOfCode } from "@/models/LineOfCode";

describe("integration tests for pre-processor.", () => {
  let code: string;
  let linesOfCode: LineOfCode[];

  beforeEach(() => {
    code = `
        
            code line 1
            
            \t code line 2
        `;
    linesOfCode = preProcess(code);
  });

  test("should have only source lines of code", () => {
    expect(linesOfCode.length).toStrictEqual(2);
  });

  test("should preserve line numbers of source code", () => {
    expect(linesOfCode[0].number).toStrictEqual(3);
    expect(linesOfCode[1].number).toStrictEqual(5);
  });

  test("should pre-process source lines of code", () => {
    expect(linesOfCode[0].value).toStrictEqual("            code line 1");
    expect(linesOfCode[1].value).toStrictEqual("                 code line 2");
  });
});
