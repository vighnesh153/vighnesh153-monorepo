import { format } from "@vighnesh153/formatter-xml";

export type FormatResponse =
  | {
    type: "success";
    result: string;
  }
  | {
    type: "error";
    errMessage: string;
  };

export function formatWrapper(text: string): FormatResponse {
  const response = format(text, { sortAttributes: true, indentation: 4 });

  if (response.type === "success") {
    return {
      type: "success",
      result: response.formattedXml,
    };
  } else if (response.type === "lexer-error") {
    const [error] = response.lexerErrors;
    let errorMessage = "Unexpected lexer error...";
    if (error) {
      const { errorCategory, lineNumber, columnNumber } = error;
      switch (errorCategory.type) {
        case "ILLEGAL_CHARACTER":
          errorMessage =
            `Illegal character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
          break;
        case "INVALID_ESCAPE_CHARACTER_LITERAL":
          errorMessage =
            `Invalid escape character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
          break;
        case "INVALID_UNICODE_CHARACTER_LITERAL":
          errorMessage =
            `Invalid unicode character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
          break;
        case "UNCLOSED_COMMENT_LITERAL":
          errorMessage = `Unclosed comment at ${lineNumber}:${columnNumber}`;
          break;
        case "UNCLOSED_ESCAPE_SEQUENCE":
          errorMessage =
            `Unclosed escape sequence at ${lineNumber}:${columnNumber}`;
          break;
        case "UNCLOSED_STRING_LITERAL":
          errorMessage = `Unclosed string at ${lineNumber}:${columnNumber}`;
          break;
        case "UNEXPECTED_COMMENT_CHARACTER":
          errorMessage =
            `Unexpected comment character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
          break;
      }
    }
    return {
      type: "error",
      errMessage: errorMessage,
    };
  } else if (response.type === "parser-error") {
    const [error] = response.parserErrors;
    let errorMessage = "Unexpected parser error...";
    if (error) {
      const { errorType, culpritToken } = error;
      switch (errorType) {
        case "UNEXPECTED_CLOSING_TAG_LITERAL":
          errorMessage =
            `Unexpected closing tag '${culpritToken.tokenLiteral}'` +
            ` at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
          break;
        case "UNEXPECTED_EOF":
          errorMessage =
            `Unexpected end of file at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
          break;
        case "UNEXPECTED_PROLOG_TAG":
          errorMessage = `Expected 'xml' found '${culpritToken.tokenLiteral}'` +
            ` at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
          break;
        case "UNEXPECTED_TOKEN":
          errorMessage = `Unexpected token '${culpritToken.tokenLiteral}'` +
            ` at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
          break;
      }
    }
    return {
      type: "error",
      errMessage: errorMessage,
    };
  }

  return {
    type: "error",
    errMessage: `Unexpected error occurred: ${
      (response.err as { message: string })?.message ?? "unknown error"
    }`,
  };
}
