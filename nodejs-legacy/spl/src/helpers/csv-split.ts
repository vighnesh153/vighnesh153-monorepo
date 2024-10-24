class CsvInfo {
  private countOpenParenthesis = 0;
  private countOpenCurlyBraces = 0;
  private countOpenSquareBrackets = 0;
  private areQuotesOpen = false;

  canSplitHere(): boolean {
    return (
      this.countOpenCurlyBraces === 0 &&
      this.countOpenParenthesis === 0 &&
      this.countOpenSquareBrackets === 0 &&
      this.areQuotesOpen === false
    );
  }

  openParentheses(): void {
    if (this.areQuotesOpen === false) this.countOpenParenthesis += 1;
  }
  openSquareBrackets(): void {
    if (this.areQuotesOpen === false) this.countOpenSquareBrackets += 1;
  }
  openCurlyBraces(): void {
    if (this.areQuotesOpen === false) this.countOpenCurlyBraces += 1;
  }

  closeParentheses(): void {
    if (this.areQuotesOpen === false && this.countOpenParenthesis > 0) {
      this.countOpenParenthesis -= 1;
    }
  }
  closeSquareBrackets(): void {
    if (this.areQuotesOpen === false && this.countOpenSquareBrackets > 0) {
      this.countOpenSquareBrackets -= 1;
    }
  }
  closeCurlyBraces(): void {
    if (this.areQuotesOpen === false && this.countOpenCurlyBraces) {
      this.countOpenCurlyBraces -= 1;
    }
  }

  processQuotes(): void {
    this.areQuotesOpen = !this.areQuotesOpen;
  }
}

export const csvSplit = (text: string): string[] => {
  text = text.trim();

  const csvInfo = new CsvInfo();
  const safeIndices: number[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    switch (ch) {
      case "(":
        csvInfo.openParentheses();
        break;
      case "{":
        csvInfo.openCurlyBraces();
        break;
      case "[":
        csvInfo.openSquareBrackets();
        break;
      case `'`:
        csvInfo.processQuotes();
        break;
      case ")":
        csvInfo.closeParentheses();
        break;
      case "}":
        csvInfo.closeCurlyBraces();
        break;
      case "]":
        csvInfo.closeSquareBrackets();
        break;
      case ",":
        if (csvInfo.canSplitHere()) safeIndices.push(i);
        break;
    }
  }

  // To include the last split
  safeIndices.push(text.length);

  const values: string[] = [];
  let prevIndex = -1;
  for (const index of safeIndices) {
    const value = text.substring(prevIndex + 1, index).trim();
    prevIndex = index;

    if (value.length > 0) values.push(value);
  }

  return values;
};
