export interface RandomStringGenerator {
  generate(length?: number): string;
}

export class RandomStringGeneratorImpl implements RandomStringGenerator {
  generate(length: number = 16): string {
    const characters: string[] = [];
    while (characters.length < length) {
      const randomCharacters = Math.random().toString(16).slice(2).split('');
      characters.push(...randomCharacters);
    }
    while (characters.length > length) {
      characters.pop();
    }
    return characters.slice(0, length).join('');
  }
}

export class FakeRandomStringGenerator implements RandomStringGenerator {
  randomString: string = '';

  generate(): string {
    return this.randomString;
  }
}
