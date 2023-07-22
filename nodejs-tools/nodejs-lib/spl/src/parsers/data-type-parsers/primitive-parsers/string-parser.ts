import { DatatypeParser } from '../datatype-parser';
import { bugReporter } from '@/language-bug-handling';

export class StringParser extends DatatypeParser {
  static instance = new StringParser();

  private constructor() {
    super();
  }

  type(): string {
    return 'string';
  }

  tryParse(text: string): boolean {
    const trimmed = text.trim();

    if (trimmed.startsWith(`'`) === false || trimmed.endsWith(`'`) === false) {
      return false;
    }

    const countOfSingleQuotes = Array.from(trimmed).filter((ch) => ch === `'`).length;

    return countOfSingleQuotes === 2;
  }

  parse(text: string): unknown {
    if (this.tryParse(text)) {
      const trimmed = text.trim();
      return trimmed.slice(1, trimmed.length - 1);
    } else {
      bugReporter.report('PARSE_INVOKED_ON_NON_STRING');
    }
  }
}
