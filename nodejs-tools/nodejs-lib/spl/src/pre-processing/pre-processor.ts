import { extractEffectiveLoc } from "./extract-effective-loc";
import { initialWhitespaceConverter } from "./initial-whitespace-converter";

import { LineOfCode } from "@/models/LineOfCode";

class PreProcessor {
  private _processedLOC: LineOfCode[] = [];

  public get processedLOC(): LineOfCode[] {
    return [...this._processedLOC];
  }

  constructor(public code: string) {}

  process() {
    this.setEffectiveLOC(this.code);
    this.transformInitialWhitespace();
  }

  private setEffectiveLOC(code: string) {
    this._processedLOC = extractEffectiveLoc(code);
  }

  private transformInitialWhitespace() {
    this._processedLOC = initialWhitespaceConverter(this._processedLOC);
  }
}

export const preProcess = (code: string): LineOfCode[] => {
  const preProcessorObj = new PreProcessor(code);
  preProcessorObj.process();

  return preProcessorObj.processedLOC;
};
