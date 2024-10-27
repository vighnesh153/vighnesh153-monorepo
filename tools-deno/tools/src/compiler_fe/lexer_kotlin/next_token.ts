// import { skipWhitespace } from './skipWhitespace';
// import {
//   EOF_CHARACTER,
//   Lexer,
//   LexerError,
//   Token,
// } from "@vighnesh153/lexer-core";
// import { readStringLiteral } from './readStringLiteral';
// import { isAcceptableIdentifierStart, readIdentifier } from './readIdentifier';
// import { readComment } from './readComment';
// import { readTextNode } from './readTextNode';
// import { KotlinTokenType } from "./tokens";

// export function nextToken(
//   lexer: Lexer<KotlinTokenType>,
// ): Token<KotlinTokenType> {
//   let t: Token<KotlinTokenType>;

//   // skipWhitespace(lexer);

//   const currCh = lexer.inputReader.currentCharacter;
//   const { lineNumber, columnNumber } = lexer.inputReader;
//   if (currCh === "/") {
//     // read single line comment
//     // read multi line comment
//     // read operators starting with "/"
//   } else if (currCh === '"') {
//     // read string
//     // handle template literals
//   } else if (currCh === EOF_CHARACTER) {
//     t = createToken(lexer, KotlinTokenType.Eof);
//   }
//   switch (currCh) {
//     case "/": {
//       t = createToken(lexer, XmlTokenType.ForwardSlash);
//       break;
//     }
//     case '"': {
//       const { lineNumber, columnNumber } = lexer.inputReader;
//       const s = readStringLiteral(lexer);
//       t = createToken(
//         lexer,
//         XmlTokenType.StringLiteral,
//         s,
//         lineNumber,
//         columnNumber,
//       );
//       break;
//     }
//     case EOF_CHARACTER: {
//       t = createToken(lexer, XmlTokenType.Eof);
//       break;
//     }
//     default: {
//       if (
//         lexer.currentToken == null ||
//         lexer.currentToken.tokenType === XmlTokenType.RightAngleBracket
//       ) {
//         const { lineNumber, columnNumber } = lexer.inputReader;
//         const textNode = readTextNode(lexer);
//         t = createToken(
//           lexer,
//           XmlTokenType.TextNode,
//           textNode,
//           lineNumber,
//           columnNumber,
//         );
//       } else if (isAcceptableIdentifierStart(currCh)) {
//         const { lineNumber, columnNumber } = lexer.inputReader;
//         const identifier = readIdentifier(lexer);
//         t = createToken(
//           lexer,
//           XmlTokenType.Identifier,
//           identifier,
//           lineNumber,
//           columnNumber,
//         );
//       } else {
//         lexer.addError(
//           new LexerError({
//             errorCategory: {
//               type: "ILLEGAL_CHARACTER",
//               ch: currCh,
//             },
//             lineNumber: lexer.inputReader.lineNumber,
//             columnNumber: lexer.inputReader.columnNumber,
//           }),
//         );
//         t = createToken(lexer, XmlTokenType.Illegal, currCh);
//       }
//       break;
//     }
//   }

//   lexer.inputReader.readNextCharacter();

//   lexer.currentToken = t;
//   return t;
// }

// function createToken(
//   lexer: Lexer<KotlinTokenType>,
//   tokenType: KotlinTokenType,
//   tokenLiteral: string = tokenType.value,
//   lineNumber: number = lexer.inputReader.lineNumber,
//   columnNumber: number = lexer.inputReader.columnNumber,
// ): Token<KotlinTokenType> {
//   return {
//     tokenType: tokenType,
//     tokenLiteral: tokenLiteral,
//     lineNumber,
//     columnNumber,
//   };
// }

// export function readOperator(lexer: Lexer<KotlinTokenType>): KotlinTokenType {
//   assert(
//     operatorTrie.hasChild(lexer.inputReader.currentCharacter!),
//     `Attempting to read an operator token that doesn't start with any of operator start characters`
//   );

//   let node = operatorTrie;
//   while (node.hasChild(lexer.inputReader.currentCharacter!)) {
//     const currCh = lexer.inputReader.currentCharacter!;
//     node = node.getChild(currCh);

//     if (node.hasChild(lexer.inputReader.peekCharacter()!)) {
//       lexer.inputReader.readNextCharacter();
//       continue;
//     }

//     return node.tokenType === null ? KotlinTokenType.Illegal : node.tokenType;
//   }

//   return KotlinTokenType.Illegal;
// }
