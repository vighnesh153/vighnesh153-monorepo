import { parseCodeComments, ParseCodeCommentsOptions } from './parseCodeComments';

const javascriptOptions: ParseCodeCommentsOptions = {
  escapeCharacters: ['\\'],
  singleLineCommentIdentifiers: ['//'],
  multiLineCommentIdentifierPairs: new Map([['/*', '*/']]),
};

test('no comments should return the code', () => {
  expect(parseCodeComments('const a = 123;', javascriptOptions)).toStrictEqual([
    {
      isComment: false,
      value: 'const a = 123;',
    },
  ]);
});

describe('single-line comments', () => {
  test('multiple single-line comments', () => {
    expect(
      parseCodeComments(
        `
// okay
const b = 1234;`,
        javascriptOptions
      )
    ).toStrictEqual([
      {
        isComment: false,
        value: `\n`,
      },
      {
        isComment: true,
        value: `// okay\n`,
      },
      {
        isComment: false,
        value: `const b = 1234;`,
      },
    ]);
  });

  test('comment on same line as code', () => {
    expect(
      parseCodeComments(
        `
// okay
const b = 1234; // pikachu`,
        javascriptOptions
      )
    ).toStrictEqual([
      {
        isComment: false,
        value: `\n`,
      },
      {
        isComment: true,
        value: `// okay\n`,
      },
      {
        isComment: false,
        value: `const b = 1234; `,
      },
      {
        isComment: true,
        value: `// pikachu`,
      },
    ]);
  });
});

describe('multi-line comments', () => {
  test('on same line', () => {
    expect(parseCodeComments(`const b = 1234; /* pikachu */ `, javascriptOptions)).toStrictEqual([
      {
        isComment: false,
        value: `const b = 1234; `,
      },
      {
        isComment: true,
        value: `/* pikachu */`,
      },
      {
        isComment: false,
        value: ` `,
      },
    ]);
  });

  test('multiple lines', () => {
    expect(
      parseCodeComments(
        `const b = 1234; /* 
pikachu
*/ 
const a = 'lol';
`,
        javascriptOptions
      )
    ).toStrictEqual([
      {
        isComment: false,
        value: `const b = 1234; `,
      },
      {
        isComment: true,
        value: `/* 
pikachu
*/`,
      },
      {
        isComment: false,
        value: ` 
const a = 'lol';
`,
      },
    ]);
  });
});
