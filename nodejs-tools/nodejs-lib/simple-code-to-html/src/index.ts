import { CommonTypes } from './commonTypes';
import { reservedWords as defaultReservedWords } from './constants';
import { ParseCodeCommentsOptions, parseCodeComments } from './parseCodeComments';
import { ParseCodeOperatorsOptions, parseCodeOperators } from './parseCodeOperators';
import { ParseCodeReservedWordsOptions, parseCodeReservedWords } from './parseCodeReservedWords';
import { ParseCodeStringsOptions, parseCodeStrings } from './parseCodeStrings';

export interface SimpleCodeToHtmlOptions
  extends Partial<CommonTypes>,
    Partial<ParseCodeStringsOptions>,
    Partial<ParseCodeCommentsOptions>,
    Partial<ParseCodeOperatorsOptions>,
    Partial<ParseCodeReservedWordsOptions> {}

type CodeSnippet = {
  type: 'string' | 'comment' | 'operator' | 'reserved-word' | 'code';
  value: string;
};

function codeSnippetsToHtml(codeSnippets: CodeSnippet[]): string {
  return codeSnippets
    .map((snippet) =>
      snippet.type === 'code' ? snippet.value : `<span class="code-${snippet.type}">${snippet.value}</span>`
    )
    .join('');
}

export function simpleCodeToHtml(
  code: string,
  options: SimpleCodeToHtmlOptions = {
    singleLineCommentIdentifiers: ['//'],
    multiLineCommentIdentifierPairs: new Map([['/*', '*/']]),
    acceptableStringChars: [`'`, `"`, '`'],
    escapeCharacters: ['\\'],
    operators: '~!@#$%^&*()-_=+{[}]|\\:;<,>.?/',
    reservedWords: defaultReservedWords,
  }
): string {
  const {
    singleLineCommentIdentifiers,
    multiLineCommentIdentifierPairs,
    acceptableStringChars,
    escapeCharacters,
    operators,
    reservedWords,
  } = options as Required<SimpleCodeToHtmlOptions>;

  // parse out strings
  let codeSnippets: CodeSnippet[] = parseCodeStrings(code, {
    acceptableStringChars,
    escapeCharacters,
  }).map((item) => ({ type: item.isString ? 'string' : 'code', value: item.value }));

  // code comments
  codeSnippets = codeSnippets.reduce((prev, snippet) => {
    if (snippet.type === 'code') {
      const res = parseCodeComments(snippet.value, {
        escapeCharacters,
        singleLineCommentIdentifiers,
        multiLineCommentIdentifierPairs,
      });
      prev.push(...res.map((item): CodeSnippet => ({ type: item.isComment ? 'comment' : 'code', value: item.value })));
    } else {
      prev.push(snippet);
    }
    return prev;
  }, [] as CodeSnippet[]);

  // operators
  codeSnippets = codeSnippets.reduce((prev, snippet) => {
    if (snippet.type === 'code') {
      const res = parseCodeOperators(snippet.value, { operators });
      prev.push(
        ...res.map((item): CodeSnippet => ({ type: item.isOperator ? 'operator' : 'code', value: item.value }))
      );
    } else {
      prev.push(snippet);
    }
    return prev;
  }, [] as CodeSnippet[]);

  // reserved words
  codeSnippets = codeSnippets.reduce((prev, snippet) => {
    if (snippet.type === 'code') {
      const res = parseCodeReservedWords(snippet.value, { reservedWords });
      prev.push(
        ...res.map((item): CodeSnippet => ({ type: item.isReservedWord ? 'reserved-word' : 'code', value: item.value }))
      );
    } else {
      prev.push(snippet);
    }
    return prev;
  }, [] as CodeSnippet[]);

  const html = codeSnippetsToHtml(codeSnippets);

  // replace all \n with <br> in all snippets
  return html.replaceAll('\n', '<br>');
}
