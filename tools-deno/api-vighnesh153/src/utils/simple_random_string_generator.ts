export interface SimpleRandomStringGenerator {
  generate(): string;
}

export class SimpleRandomStringGeneratorImpl
  implements SimpleRandomStringGenerator {
  generate(): string {
    return Math.random().toString(16).slice(2);
  }
}
