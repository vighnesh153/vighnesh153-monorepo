import { extractEffectiveLoc } from "@/pre-processing/extract-effective-loc";

describe("check for extracting effective lines of code", () => {
  test("should return empty array for empty string input", () => {
    const code = "";
    const actual = extractEffectiveLoc(code);
    expect(actual.length).toStrictEqual(0);
  });

  test("should return empty array for whitespace string input", () => {
    const code = `
                
                    
                    \r
                    
        `;
    const actual = extractEffectiveLoc(code);
    expect(actual.length).toStrictEqual(0);
  });

  test("should return non-empty array for non-empty code input", () => {
    const code = `
        
        code line 1
        
        code line 2
        
        `;
    const actual = extractEffectiveLoc(code);
    expect(actual.length).toStrictEqual(2);
  });

  test("should not trim whitespace from effective lines of code", () => {
    const code = `
        
        code line 1
        
        code line 2
        
        `;
    const actual = extractEffectiveLoc(code);
    expect(actual[0].value).toStrictEqual("        code line 1");
    expect(actual[1].value).toStrictEqual("        code line 2");
  });
});
