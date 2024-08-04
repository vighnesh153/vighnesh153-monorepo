import { test, expect } from 'vitest';
import { LexerInputReader } from './LexerInputReader';
import { StringLexerInput } from './LexerInput';
import { EOF_CHARACTER } from './utils';

test('should read empty string without errors', () => {
  const input = new StringLexerInput('');
  const reader = new LexerInputReader(input);

  expect(reader.currentCharacter).toBe(EOF_CHARACTER);
});

test('should read string, of single character, without errors', () => {
  const input = new StringLexerInput('p');
  const reader = new LexerInputReader(input);

  expect(reader.currentCharacter).toBe('p');
});

test('should update currentCharacter when readNextCharacter is called', () => {
  const input = new StringLexerInput('pika');
  const reader = new LexerInputReader(input);

  expect(reader.currentCharacter).toBe('p');
  reader.readNextCharacter();
  expect(reader.currentCharacter).toBe('i');
  reader.readNextCharacter();
  expect(reader.currentCharacter).toBe('k');
  reader.readNextCharacter();
  expect(reader.currentCharacter).toBe('a');
});

test(
  'current character should be EOF when the entire input is done reading ' +
    'no matter how many times readNextCharacter is called',
  () => {
    const input = new StringLexerInput('abc');
    const reader = new LexerInputReader(input);

    expect(reader.currentCharacter).toBe('a');
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe('b');
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe('c');
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe(EOF_CHARACTER);
    reader.readNextCharacter();
    expect(reader.currentCharacter).toBe(EOF_CHARACTER);
  }
);

test('should update currentIndex when readNextCharacter is called and should stick to size of input at end', () => {
  const input = new StringLexerInput('pika');
  const reader = new LexerInputReader(input);

  expect(reader.currentIndex).toBe(0);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(1);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(2);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(3);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(4);
  reader.readNextCharacter();
  expect(reader.currentIndex).toBe(4);
});

test('should update peekCharacter when readNextCharacter is called', () => {
  const input = new StringLexerInput('pika');
  const reader = new LexerInputReader(input);

  expect(reader.peekCharacter).toBe('i');
  reader.readNextCharacter();
  expect(reader.peekCharacter).toBe('k');
  reader.readNextCharacter();
  expect(reader.peekCharacter).toBe('a');
  reader.readNextCharacter();
  expect(reader.peekCharacter).toBe(EOF_CHARACTER);
  reader.readNextCharacter();
  expect(reader.peekCharacter).toBe(EOF_CHARACTER);
});
