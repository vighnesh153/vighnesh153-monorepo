import { reservedWords } from './constants.ts';
import { parseCodeReservedWords } from './parseCodeReservedWords.ts';

const javascriptReservedWords = {
  reservedWords,
};

test('no reserved words', () => {
  expect(parseCodeReservedWords('hello pikachu', javascriptReservedWords)).toStrictEqual([
    {
      isReservedWord: false,
      value: 'hello pikachu',
    },
  ]);
});

test('reserved words', () => {
  expect(
    parseCodeReservedWords(' public hello pikachu const hello let class as', javascriptReservedWords)
  ).toStrictEqual([
    {
      isReservedWord: false,
      value: ' ',
    },
    {
      isReservedWord: true,
      value: 'public',
    },
    {
      isReservedWord: false,
      value: ' hello pikachu ',
    },
    {
      isReservedWord: true,
      value: 'const',
    },
    {
      isReservedWord: false,
      value: ' hello ',
    },
    {
      isReservedWord: true,
      value: 'let',
    },
    {
      isReservedWord: false,
      value: ' ',
    },
    {
      isReservedWord: true,
      value: 'class',
    },
    {
      isReservedWord: false,
      value: ' ',
    },
    {
      isReservedWord: true,
      value: 'as',
    },
  ]);
});
