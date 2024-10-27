import { DatatypeParser } from "../datatype-parser";
import { bugReporter } from "@/language-bug-handling";

export class BooleanParser extends DatatypeParser {
  static instance = new BooleanParser();

  private constructor() {
    super();
  }

  type(): string {
    return "boolean";
  }

  tryParse(text: string): boolean {
    const trimmed = text.trim();

    return ["true", "false"].includes(trimmed);
  }

  parse(text: string): unknown {
    if (this.tryParse(text)) {
      return JSON.parse(text);
    } else {
      bugReporter.report("PARSE_CALLED_ON_INVALID_BOOL_STRING");
    }
  }
}
