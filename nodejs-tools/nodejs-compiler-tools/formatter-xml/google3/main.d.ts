import { LexerError } from '@vighnesh153/lexer-core';
import { ParserError } from '@vighnesh153/parser-xml';

type FormattingOptions = {
    indentation?: number;
    sortAttributes?: boolean;
};

type FormatResponse = {
    type: 'lexer-error';
    lexerErrors: readonly LexerError[];
} | {
    type: 'parser-error';
    parserErrors: readonly ParserError[];
} | {
    type: 'unknown-error';
    err: unknown;
} | {
    type: 'success';
    formattedXml: string;
};
declare function format(rawXml: string, { indentation, sortAttributes }: FormattingOptions): FormatResponse;

export { type FormatResponse, format };
