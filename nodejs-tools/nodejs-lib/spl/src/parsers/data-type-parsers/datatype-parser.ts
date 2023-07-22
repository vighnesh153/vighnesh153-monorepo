export abstract class DatatypeParser {
  abstract type(): string;

  abstract parse(text: string): unknown;
  abstract tryParse(text: string): boolean;
}
