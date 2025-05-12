var pika_xml_formatter = (function (exports) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
  var __privateWrapper = (obj, member, setter, getter) => ({
    set _(value) {
      __privateSet(obj, member, value);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  });

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/mod.js
  var mod_exports3 = {};
  __export(mod_exports3, {
    format: () => format2,
    formatWrapper: () => formatWrapper
  });

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/mod.js
  var mod_exports = {};
  __export(mod_exports, {
    EOF_CHARACTER: () => EOF_CHARACTER,
    Lexer: () => Lexer,
    LexerError: () => LexerError,
    LexerInputReader: () => LexerInputReader,
    StringLexerInput: () => StringLexerInput,
    cloneToken: () => cloneToken
  });

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/lexer.js
  var _errors;
  var Lexer = class {
    constructor(inputReader) {
      __publicField(this, "inputReader");
      __privateAdd(this, _errors);
      __publicField(this, "currentToken");
      this.inputReader = inputReader;
      __privateSet(this, _errors, []);
      this.currentToken = null;
    }
    get errors() {
      return __privateGet(this, _errors).map((error) => error.copy());
    }
    addError(error) {
      __privateGet(this, _errors).push(error);
    }
  };
  _errors = new WeakMap();

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/lexer_error.js
  var LexerError = class _LexerError {
    constructor(props) {
      __publicField(this, "props");
      this.props = props;
    }
    get errorCategory() {
      return this.props.errorCategory;
    }
    get lineNumber() {
      return this.props.lineNumber;
    }
    get columnNumber() {
      return this.props.columnNumber;
    }
    copy(overrides = {}) {
      return new _LexerError(__spreadValues(__spreadValues({}, this.props), overrides));
    }
  };

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/utils.js
  var EOF_CHARACTER = null;

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/lexer_input.js
  var StringLexerInput = class {
    constructor(input) {
      __publicField(this, "input");
      this.input = input;
    }
    getSize() {
      return this.input.length;
    }
    getCharacterAt(position) {
      if (position < 0 || position >= this.getSize()) {
        return EOF_CHARACTER;
      }
      return this.input[position];
    }
  };

  // node_modules/@vighnesh153/tools/src/utils/not.js
  function not(value) {
    return !value;
  }

  // node_modules/@vighnesh153/tools/src/utils/constants.js
  var DIGITS = "0123456789";
  var HEXADECIMAL_DIGITS = /* @__PURE__ */ (() => `${DIGITS}abcdefABCDEF`)();
  var LOWERCASE_ALPHABET = `abcdefghijklmnopqrstuvwxyz`;
  var UPPERCASE_ALPHABET = /* @__PURE__ */ LOWERCASE_ALPHABET.toUpperCase();
  var ALPHABET = /* @__PURE__ */ (() => LOWERCASE_ALPHABET + UPPERCASE_ALPHABET)();

  // node_modules/@vighnesh153/tools/src/utils/repeat.js
  function repeat(times, callback) {
    for (let i = 0; i < times; i++) {
      callback(i + 1);
    }
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/lexer_input_reader.js
  var _currentIndex, _peekIndex, _previousCharacter, _currentCharacter, _lineNumber, _columnNumber;
  var LexerInputReader = class {
    constructor(lexerInput) {
      __publicField(this, "lexerInput");
      __privateAdd(this, _currentIndex);
      __privateAdd(this, _peekIndex);
      __privateAdd(this, _previousCharacter);
      __privateAdd(this, _currentCharacter);
      __privateAdd(this, _lineNumber);
      __privateAdd(this, _columnNumber);
      this.lexerInput = lexerInput;
      __privateSet(this, _currentIndex, -1);
      __privateSet(this, _peekIndex, 0);
      __privateSet(this, _previousCharacter, EOF_CHARACTER);
      __privateSet(this, _currentCharacter, EOF_CHARACTER);
      __privateSet(this, _lineNumber, 1);
      __privateSet(this, _columnNumber, 0);
      this.readNextCharacter();
    }
    get currentCharacter() {
      return __privateGet(this, _currentCharacter);
    }
    get currentIndex() {
      return Math.min(__privateGet(this, _currentIndex), this.lexerInput.getSize());
    }
    get lineNumber() {
      return __privateGet(this, _lineNumber);
    }
    get columnNumber() {
      return __privateGet(this, _columnNumber);
    }
    readNextCharacter() {
      __privateSet(this, _previousCharacter, __privateGet(this, _currentCharacter));
      if (__privateGet(this, _peekIndex) >= this.lexerInput.getSize()) {
        __privateSet(this, _currentCharacter, EOF_CHARACTER);
      } else {
        __privateSet(this, _currentCharacter, this.lexerInput.getCharacterAt(__privateGet(this, _peekIndex)));
        __privateWrapper(this, _columnNumber)._++;
      }
      if (__privateGet(this, _previousCharacter) === "\n") {
        __privateWrapper(this, _lineNumber)._++;
        __privateSet(this, _columnNumber, 1);
      }
      __privateSet(this, _currentIndex, __privateGet(this, _peekIndex));
      __privateSet(this, _peekIndex, Math.min(1 + __privateGet(this, _peekIndex), this.lexerInput.getSize()));
    }
    peekCharacter(futureOffset = 0) {
      if (futureOffset < 0 || not(Number.isInteger(futureOffset))) {
        throw new Error(`Expected future offset to be a non-negative integer, found '${futureOffset}'`);
      }
      const peekIndex = __privateGet(this, _peekIndex) + futureOffset;
      if (peekIndex >= this.lexerInput.getSize()) {
        return EOF_CHARACTER;
      }
      return this.lexerInput.getCharacterAt(peekIndex);
    }
  };
  _currentIndex = new WeakMap();
  _peekIndex = new WeakMap();
  _previousCharacter = new WeakMap();
  _currentCharacter = new WeakMap();
  _lineNumber = new WeakMap();
  _columnNumber = new WeakMap();

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_core/tokens.js
  function cloneToken(token) {
    return __spreadValues({}, token);
  }

  // node_modules/@jsr/std__assert/assertion_error.js
  var AssertionError = class extends Error {
    /** Constructs a new instance.
     *
     * @param message The error message.
     * @param options Additional options. This argument is still unstable. It may change in the future release.
     */
    constructor(message, options) {
      super(message, options);
      this.name = "AssertionError";
    }
  };

  // node_modules/@jsr/std__assert/equal.js
  var _a;
  var Temporal = (_a = globalThis.Temporal) != null ? _a : new Proxy({}, {
    get: () => {
    }
  });
  new Set([
    Intl.Locale,
    RegExp,
    Temporal.Duration,
    Temporal.Instant,
    Temporal.PlainDate,
    Temporal.PlainDateTime,
    Temporal.PlainTime,
    Temporal.PlainYearMonth,
    Temporal.PlainMonthDay,
    Temporal.ZonedDateTime,
    URL,
    URLSearchParams
  ].filter((x) => x != null).map((x) => x.prototype));

  // node_modules/@jsr/std__internal/styles.js
  var { Deno } = globalThis;
  typeof (Deno == null ? void 0 : Deno.noColor) === "boolean" ? Deno.noColor : false;

  // node_modules/@jsr/std__assert/assert.js
  function assert(expr, msg = "") {
    if (!expr) {
      throw new AssertionError(msg);
    }
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/mod.js
  var mod_exports2 = {};
  __export(mod_exports2, {
    XmlTokenType: () => XmlTokenType,
    nextToken: () => nextToken
  });

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/whitespace_utils.js
  var WHITE_SPACE_CHARACTERS = [
    " ",
    "	",
    "\n",
    "\r"
  ];
  function skipWhitespace(lexer) {
    let currCh = lexer.inputReader.currentCharacter;
    while (currCh !== null && isWhitespace(currCh)) {
      lexer.inputReader.readNextCharacter();
      currCh = lexer.inputReader.currentCharacter;
    }
  }
  function isWhitespace(char) {
    if (char == null) {
      return false;
    }
    return WHITE_SPACE_CHARACTERS.includes(char);
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/read_escape_sequence.js
  function readEscapeSequence(lexer) {
    assert(lexer.inputReader.currentCharacter === "\\", `You should not attempt to read an escaped sequence if it doesn't start with '\\'`);
    lexer.inputReader.readNextCharacter();
    const currCh = lexer.inputReader.currentCharacter;
    switch (currCh) {
      case "u":
        return parseUnicode(lexer);
      case "t":
        return `	`;
      case "n":
        return `
`;
      case "\\":
        return `\\`;
      case '"':
        return `"`;
      case EOF_CHARACTER: {
        lexer.addError(new LexerError({
          errorCategory: {
            type: "UNCLOSED_ESCAPE_SEQUENCE"
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber
        }));
        return `
`;
      }
      default: {
        lexer.addError(new LexerError({
          errorCategory: {
            type: "INVALID_ESCAPE_CHARACTER_LITERAL",
            ch: lexer.inputReader.currentCharacter
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber
        }));
        return `
`;
      }
    }
  }
  function parseUnicode(lexer) {
    assert(lexer.inputReader.currentCharacter === "u", `You should not try to parse a unicode sequence that doesn't begin with 'u'`);
    const unicodeCharacters = [];
    repeat(4, () => {
      var _a2;
      const peek = (_a2 = lexer.inputReader.peekCharacter()) == null ? void 0 : _a2.toLowerCase();
      if (HEXADECIMAL_DIGITS.includes(`${peek}`.toLowerCase())) {
        lexer.inputReader.readNextCharacter();
        unicodeCharacters.push(lexer.inputReader.currentCharacter);
      } else {
        lexer.addError(new LexerError({
          errorCategory: {
            type: "INVALID_UNICODE_CHARACTER_LITERAL",
            ch: peek
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber
        }));
        return " ";
      }
    });
    return String.fromCharCode(parseInt(unicodeCharacters.join(""), 16));
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/read_string_literal.js
  var DOUBLE_QUOTE = '"';
  function readStringLiteral(lexer) {
    assert(lexer.inputReader.currentCharacter === DOUBLE_QUOTE, `You should not attempt to read a string literal if it doesn't start with '"'`);
    lexer.inputReader.readNextCharacter();
    const stringLiteralBuilder = [];
    let currCh = lexer.inputReader.currentCharacter;
    while (currCh !== DOUBLE_QUOTE && currCh !== EOF_CHARACTER) {
      if (currCh === "\\") {
        stringLiteralBuilder.push(readEscapeSequence(lexer));
      } else {
        stringLiteralBuilder.push(currCh);
      }
      lexer.inputReader.readNextCharacter();
      currCh = lexer.inputReader.currentCharacter;
    }
    if (currCh === EOF_CHARACTER) {
      lexer.addError(new LexerError({
        errorCategory: {
          type: "UNCLOSED_STRING_LITERAL"
        },
        lineNumber: lexer.inputReader.lineNumber,
        columnNumber: lexer.inputReader.columnNumber
      }));
    }
    return stringLiteralBuilder.join("");
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/read_identifier.js
  function readIdentifier(lexer) {
    var _a2;
    assert(isAcceptableIdentifierStart((_a2 = lexer.inputReader.currentCharacter) != null ? _a2 : ""), `You should not attempt to read an identifier which doesn't start with '_' or a letter`);
    const identifierBuilder = [];
    while (isAcceptableIdentifierCharacter(lexer.inputReader.peekCharacter())) {
      identifierBuilder.push(lexer.inputReader.currentCharacter);
      lexer.inputReader.readNextCharacter();
    }
    if (isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter)) {
      identifierBuilder.push(lexer.inputReader.currentCharacter);
    }
    return identifierBuilder.join("");
  }
  function isAcceptableIdentifierStart(char) {
    return ALPHABET.includes(char) || char === "_";
  }
  function isAcceptableIdentifierCharacter(char) {
    if (char === null) {
      return false;
    }
    return isAcceptableIdentifierStart(char) || DIGITS.includes(char) || char === "-" || char === "." || char === ":";
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/read_comment.js
  function readComment(lexer) {
    assert(lexer.inputReader.currentCharacter === "<" && lexer.inputReader.peekCharacter() === "!", `Don't attempt to read a comment if string doesn't start with '<!'`);
    lexer.inputReader.readNextCharacter();
    lexer.inputReader.readNextCharacter();
    let isValidCommentStart = true;
    repeat(2, () => {
      if (not(isValidCommentStart)) return;
      if (lexer.inputReader.currentCharacter !== "-") {
        lexer.addError(new LexerError({
          errorCategory: {
            type: "UNEXPECTED_COMMENT_CHARACTER",
            ch: lexer.inputReader.currentCharacter
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber
        }));
        isValidCommentStart = false;
        return;
      }
      lexer.inputReader.readNextCharacter();
    });
    if (not(isValidCommentStart)) {
      return null;
    }
    const commentLiteralBuilder = [];
    while (true) {
      const currCh = lexer.inputReader.currentCharacter;
      if (currCh === EOF_CHARACTER) {
        lexer.addError(new LexerError({
          errorCategory: {
            type: "UNCLOSED_COMMENT_LITERAL"
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber
        }));
        return null;
      }
      const peek = lexer.inputReader.peekCharacter();
      const peekNext = lexer.inputReader.peekCharacter(1);
      if (currCh === "-" && peek === "-" && peekNext === ">") {
        lexer.inputReader.readNextCharacter();
        lexer.inputReader.readNextCharacter();
        return commentLiteralBuilder.join("");
      }
      commentLiteralBuilder.push(currCh);
      lexer.inputReader.readNextCharacter();
    }
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/read_text_node.js
  var LEFT_ANGLE_BRACKET = "<";
  function readTextNode(lexer) {
    const textNodeBuilder = [];
    let currCh = lexer.inputReader.currentCharacter;
    while (lexer.inputReader.peekCharacter() !== LEFT_ANGLE_BRACKET && currCh !== EOF_CHARACTER) {
      textNodeBuilder.push(currCh);
      lexer.inputReader.readNextCharacter();
      currCh = lexer.inputReader.currentCharacter;
    }
    if (lexer.inputReader.peekCharacter() === LEFT_ANGLE_BRACKET) {
      textNodeBuilder.push(lexer.inputReader.currentCharacter);
    }
    return textNodeBuilder.join("");
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/tokens.js
  var _XmlTokenType = class _XmlTokenType {
    constructor(value) {
      __publicField(this, "value");
      this.value = value;
    }
  };
  __publicField(_XmlTokenType, "Illegal", /* @__PURE__ */ new _XmlTokenType("Illegal"));
  __publicField(_XmlTokenType, "Eof", /* @__PURE__ */ new _XmlTokenType("Eof"));
  __publicField(_XmlTokenType, "Identifier", /* @__PURE__ */ new _XmlTokenType("Identifier"));
  __publicField(_XmlTokenType, "StringLiteral", /* @__PURE__ */ new _XmlTokenType("StringLiteral"));
  __publicField(_XmlTokenType, "CommentLiteral", /* @__PURE__ */ new _XmlTokenType("CommentLiteral"));
  __publicField(_XmlTokenType, "TextNode", /* @__PURE__ */ new _XmlTokenType("TextNode"));
  __publicField(_XmlTokenType, "Equals", /* @__PURE__ */ new _XmlTokenType("="));
  __publicField(_XmlTokenType, "LeftAngleBracket", /* @__PURE__ */ new _XmlTokenType("<"));
  __publicField(_XmlTokenType, "RightAngleBracket", /* @__PURE__ */ new _XmlTokenType(">"));
  __publicField(_XmlTokenType, "ForwardSlash", /* @__PURE__ */ new _XmlTokenType("/"));
  __publicField(_XmlTokenType, "QuestionMark", /* @__PURE__ */ new _XmlTokenType("?"));
  var XmlTokenType = _XmlTokenType;

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_xml/next_token.js
  function nextToken(lexer) {
    let t;
    skipWhitespace(lexer);
    const currCh = lexer.inputReader.currentCharacter;
    switch (currCh) {
      case "=": {
        t = createToken(lexer, XmlTokenType.Equals);
        break;
      }
      case "<": {
        if (lexer.inputReader.peekCharacter() === "!") {
          const { lineNumber, columnNumber } = lexer.inputReader;
          const commentLiteral = readComment(lexer);
          if (commentLiteral !== null) {
            t = createToken(lexer, XmlTokenType.CommentLiteral, commentLiteral, lineNumber, columnNumber);
          } else {
            t = createToken(lexer, XmlTokenType.Illegal, `${lexer.inputReader.currentCharacter}`);
          }
        } else {
          t = createToken(lexer, XmlTokenType.LeftAngleBracket);
        }
        break;
      }
      case ">": {
        t = createToken(lexer, XmlTokenType.RightAngleBracket);
        break;
      }
      case "/": {
        t = createToken(lexer, XmlTokenType.ForwardSlash);
        break;
      }
      case "?": {
        t = createToken(lexer, XmlTokenType.QuestionMark);
        break;
      }
      case '"': {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const s = readStringLiteral(lexer);
        t = createToken(lexer, XmlTokenType.StringLiteral, s, lineNumber, columnNumber);
        break;
      }
      case EOF_CHARACTER: {
        t = createToken(lexer, XmlTokenType.Eof);
        break;
      }
      default: {
        if (lexer.currentToken == null || lexer.currentToken.tokenType === XmlTokenType.RightAngleBracket) {
          const { lineNumber, columnNumber } = lexer.inputReader;
          const textNode = readTextNode(lexer);
          t = createToken(lexer, XmlTokenType.TextNode, textNode, lineNumber, columnNumber);
        } else if (isAcceptableIdentifierStart(currCh)) {
          const { lineNumber, columnNumber } = lexer.inputReader;
          const identifier = readIdentifier(lexer);
          if (identifier.endsWith(".") || identifier.endsWith(":")) {
            lexer.addError(new LexerError({
              errorCategory: {
                type: "ILLEGAL_CHARACTER",
                ch: currCh
              },
              lineNumber: lexer.inputReader.lineNumber,
              columnNumber: lexer.inputReader.columnNumber
            }));
            t = createToken(lexer, XmlTokenType.Illegal, identifier.at(-1), lineNumber, columnNumber + identifier.length - 1);
          } else {
            t = createToken(lexer, XmlTokenType.Identifier, identifier, lineNumber, columnNumber);
          }
        } else {
          lexer.addError(new LexerError({
            errorCategory: {
              type: "ILLEGAL_CHARACTER",
              ch: currCh
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber
          }));
          t = createToken(lexer, XmlTokenType.Illegal, currCh);
        }
        break;
      }
    }
    lexer.inputReader.readNextCharacter();
    lexer.currentToken = t;
    return t;
  }
  function createToken(lexer, tokenType, tokenLiteral = tokenType.value, lineNumber = lexer.inputReader.lineNumber, columnNumber = lexer.inputReader.columnNumber) {
    return {
      tokenType,
      tokenLiteral,
      lineNumber,
      columnNumber
    };
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/parser_xml/parser_error.js
  var ParserError = class _ParserError {
    constructor(props) {
      __publicField(this, "props");
      this.props = props;
    }
    get errorType() {
      return this.props.errorType;
    }
    get culpritToken() {
      return cloneToken(this.props.culpritToken);
    }
    copy(overrides = {}) {
      return new _ParserError(__spreadValues(__spreadValues({}, this.props), overrides));
    }
    serialized() {
      return {
        errorType: this.errorType,
        culpritToken: this.culpritToken
      };
    }
  };

  // node_modules/@vighnesh153/tools/src/compiler_fe/parser_xml/ast.js
  var XmlElementAttribute = class {
    constructor(attributeName, value) {
      __publicField(this, "attributeName");
      __publicField(this, "value");
      this.attributeName = attributeName;
      this.value = value;
    }
    toString() {
      return `${this.attributeName.tokenLiteral}="${this.value.tokenLiteral}"`;
    }
  };
  var _statements;
  var XmlProgram = class {
    constructor() {
      __publicField(this, "astNodeType", "XML_PROGRAM");
      __privateAdd(this, _statements, []);
    }
    get statements() {
      return [
        ...__privateGet(this, _statements)
      ];
    }
    addStatement(statement) {
      __privateGet(this, _statements).push(statement);
    }
    toString(indentation) {
      return __privateGet(this, _statements).map((statement) => statement.toString(indentation)).join("\n");
    }
  };
  _statements = new WeakMap();
  var _attributes;
  var XmlPrologNode = class {
    constructor() {
      __publicField(this, "astNodeType", "XML_PROLOG_NODE");
      __privateAdd(this, _attributes, []);
    }
    get attributes() {
      return [
        ...__privateGet(this, _attributes)
      ];
    }
    addAttribute(attribute) {
      __privateGet(this, _attributes).push(attribute);
    }
    toString(indentation = 0) {
      const stringBuilder = [];
      stringBuilder.push(`${buildIndentationSpace(indentation)}<?xml`);
      for (const attribute of this.attributes) {
        stringBuilder.push(attribute.toString());
      }
      return stringBuilder.join(" ") + `?>`;
    }
  };
  _attributes = new WeakMap();
  var _tag, _attributes2, _children;
  var XmlTagNode = class {
    constructor(tag) {
      __publicField(this, "astNodeType", "XML_TAG_NODE");
      __privateAdd(this, _tag);
      __privateAdd(this, _attributes2, []);
      __privateAdd(this, _children, []);
      __privateSet(this, _tag, tag);
    }
    get tag() {
      return __privateGet(this, _tag);
    }
    get attributes() {
      return [
        ...__privateGet(this, _attributes2)
      ];
    }
    get children() {
      return [
        ...__privateGet(this, _children)
      ];
    }
    addAttribute(attribute) {
      __privateGet(this, _attributes2).push(attribute);
    }
    addChild(statement) {
      __privateGet(this, _children).push(statement);
    }
    toString(indentation = 0) {
      const { tag, attributes, children } = this;
      const stringBuilder = [];
      stringBuilder.push(`${buildIndentationSpace(indentation)}<${tag.tokenLiteral}`);
      if (attributes.length === 1) {
        const serializedAttrs = attributes.map((attribute) => attribute.toString()).join(" ");
        stringBuilder[stringBuilder.length - 1] += " " + serializedAttrs;
      } else if (attributes.length > 1) {
        attributes.forEach((attribute) => {
          stringBuilder.push(`${buildIndentationSpace(indentation + 1)}${attribute.toString()}`);
        });
      }
      if (children.length === 0) {
        stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + " />";
      } else {
        stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + ">";
      }
      if (children.length === 1 && children[0].astNodeType === "XML_TEXT_NODE") {
        return stringBuilder.join("\n") + children[0].toString(0) + `</${tag.tokenLiteral}>`;
      }
      for (const child of children) {
        stringBuilder.push(child.toString(indentation + 1));
      }
      if (children.length > 0) {
        stringBuilder.push(`${buildIndentationSpace(indentation)}</${tag.tokenLiteral}>`);
      }
      return stringBuilder.join("\n");
    }
  };
  _tag = new WeakMap();
  _attributes2 = new WeakMap();
  _children = new WeakMap();
  var XmlCommentNode = class {
    constructor(comment) {
      __publicField(this, "comment");
      __publicField(this, "astNodeType");
      this.comment = comment;
      this.astNodeType = "XML_COMMENT_NODE";
    }
    toString(indentation) {
      return `${buildIndentationSpace(indentation)}<!-- ${this.comment.tokenLiteral.trim()} -->`;
    }
  };
  function buildIndentationSpace(indentation) {
    return Array.from({
      length: indentation * 4
    }).map(() => " ").join("");
  }
  var XmlTextNode = class {
    constructor(text) {
      __publicField(this, "text");
      __publicField(this, "astNodeType");
      this.text = text;
      this.astNodeType = "XML_TEXT_NODE";
    }
    toString(indentation) {
      return `${buildIndentationSpace(indentation)}${this.text.tokenLiteral.trim()}`;
    }
  };

  // node_modules/@vighnesh153/tools/src/compiler_fe/parser_xml/xml_parser.js
  var _errors2, _currentToken, _peekToken;
  var XmlParser = class {
    constructor(lexer) {
      __publicField(this, "lexer");
      __privateAdd(this, _errors2);
      __privateAdd(this, _currentToken);
      __privateAdd(this, _peekToken);
      this.lexer = lexer;
      __privateSet(this, _errors2, []);
      this.nextToken();
      this.nextToken();
    }
    get errors() {
      return __privateGet(this, _errors2).map((error) => error.copy());
    }
    parseProgram() {
      const program = new XmlProgram();
      while (not(this.isCurrentToken(XmlTokenType.Eof))) {
        const statement = this.parseStatement();
        if (statement === null) {
          break;
        }
        program.addStatement(statement);
        this.nextToken();
      }
      return program;
    }
    addError(error) {
      __privateGet(this, _errors2).push(error);
    }
    isCurrentToken(tokenType) {
      return __privateGet(this, _currentToken).tokenType === tokenType;
    }
    isPeekToken(tokenType) {
      return __privateGet(this, _peekToken).tokenType === tokenType;
    }
    expectPeek(tokenType) {
      if (this.isPeekToken(tokenType)) {
        this.nextToken();
        return true;
      }
      this.addError(new ParserError({
        errorType: "UNEXPECTED_TOKEN",
        culpritToken: __privateGet(this, _peekToken)
      }));
      return false;
    }
    nextToken() {
      if (__privateGet(this, _peekToken)) {
        __privateSet(this, _currentToken, __privateGet(this, _peekToken));
      }
      __privateSet(this, _peekToken, nextToken(this.lexer));
    }
    parseStatement() {
      if (this.isCurrentToken(XmlTokenType.LeftAngleBracket)) {
        if (this.isPeekToken(XmlTokenType.QuestionMark)) {
          return this.parseXmlPrologNode();
        }
        if (this.isPeekToken(XmlTokenType.Identifier)) {
          return this.parseXmlTagNode();
        }
        this.addError(new ParserError({
          errorType: "UNEXPECTED_TOKEN",
          culpritToken: __privateGet(this, _peekToken)
        }));
        return null;
      }
      if (this.isCurrentToken(XmlTokenType.CommentLiteral)) {
        return this.parseXmlCommentNode();
      }
      if (this.isCurrentToken(XmlTokenType.TextNode)) {
        return this.parseXmlTextNode();
      }
      this.addError(new ParserError({
        errorType: "UNEXPECTED_TOKEN",
        culpritToken: __privateGet(this, _currentToken)
      }));
      return null;
    }
    parseXmlPrologNode() {
      assert(this.isCurrentToken(XmlTokenType.LeftAngleBracket), `Shouldn't call parseXmlPrologNode when current token is not '<'`);
      this.nextToken();
      assert(this.isCurrentToken(XmlTokenType.QuestionMark), `Shouldn't call parseXmlPrologNode when expression doesn't start with '<?'`);
      if (not(this.expectPeek(XmlTokenType.Identifier))) {
        return null;
      }
      if (__privateGet(this, _currentToken).tokenLiteral !== "xml") {
        this.addError(new ParserError({
          errorType: "UNEXPECTED_PROLOG_TAG",
          culpritToken: __privateGet(this, _currentToken)
        }));
        return null;
      }
      this.nextToken();
      const xmlPrologNode = new XmlPrologNode();
      while (true) {
        if (this.isCurrentToken(XmlTokenType.Eof)) {
          this.addError(new ParserError({
            culpritToken: __privateGet(this, _currentToken),
            errorType: "UNEXPECTED_EOF"
          }));
          return null;
        }
        if (this.isCurrentToken(XmlTokenType.QuestionMark)) {
          if (not(this.expectPeek(XmlTokenType.RightAngleBracket))) {
            return null;
          }
          return xmlPrologNode;
        }
        const attribute = this.parseAttribute();
        if (attribute === null) {
          return null;
        }
        xmlPrologNode.addAttribute(attribute);
        this.nextToken();
      }
    }
    parseXmlTagNode() {
      assert(this.isCurrentToken(XmlTokenType.LeftAngleBracket), `Shouldn't call parseXmlTagNode when current token is not '<'`);
      this.nextToken();
      assert(this.isCurrentToken(XmlTokenType.Identifier), `Shouldn't call parseXmlTagNode when statement doesn't start with "<IDENTIFIER"`);
      const xmlTagNode = new XmlTagNode(__privateGet(this, _currentToken));
      this.nextToken();
      while (true) {
        if (this.isCurrentToken(XmlTokenType.Eof)) {
          this.addError(new ParserError({
            culpritToken: __privateGet(this, _currentToken),
            errorType: "UNEXPECTED_EOF"
          }));
          return null;
        }
        if (this.isCurrentToken(XmlTokenType.ForwardSlash)) {
          break;
        }
        if (this.isCurrentToken(XmlTokenType.RightAngleBracket)) {
          break;
        }
        const attribute = this.parseAttribute();
        if (attribute === null) {
          return null;
        }
        xmlTagNode.addAttribute(attribute);
        this.nextToken();
      }
      if (this.isCurrentToken(XmlTokenType.ForwardSlash)) {
        if (not(this.expectPeek(XmlTokenType.RightAngleBracket))) {
          return null;
        }
        return xmlTagNode;
      }
      assert(this.isCurrentToken(XmlTokenType.RightAngleBracket), `Expected ">" found ${__privateGet(this, _currentToken).tokenLiteral}`);
      this.nextToken();
      while (true) {
        if (this.isPeekToken(XmlTokenType.Eof)) {
          this.addError(new ParserError({
            culpritToken: __privateGet(this, _peekToken),
            errorType: "UNEXPECTED_EOF"
          }));
          return null;
        }
        if (this.isCurrentToken(XmlTokenType.LeftAngleBracket) && this.isPeekToken(XmlTokenType.ForwardSlash)) {
          break;
        }
        const statement = this.parseStatement();
        if (statement === null) {
          return null;
        }
        xmlTagNode.addChild(statement);
        this.nextToken();
      }
      assert(this.isCurrentToken(XmlTokenType.LeftAngleBracket), `Expected "<" found ${__privateGet(this, _currentToken).tokenLiteral}`);
      this.nextToken();
      if (not(this.expectPeek(XmlTokenType.Identifier))) {
        return null;
      }
      const closingTag = __privateGet(this, _currentToken);
      this.nextToken();
      const openingTagName = xmlTagNode.tag.tokenLiteral;
      if (openingTagName !== closingTag.tokenLiteral) {
        this.addError(new ParserError({
          culpritToken: __spreadProps(__spreadValues({}, closingTag), {
            tokenLiteral: closingTag.tokenLiteral
          }),
          errorType: "UNEXPECTED_CLOSING_TAG_LITERAL"
        }));
        return null;
      }
      if (not(this.isCurrentToken(XmlTokenType.RightAngleBracket))) {
        this.addError(new ParserError({
          culpritToken: __privateGet(this, _currentToken),
          errorType: "UNEXPECTED_TOKEN"
        }));
        return null;
      }
      return xmlTagNode;
    }
    parseAttribute() {
      if (not(this.isCurrentToken(XmlTokenType.Identifier))) {
        this.addError(new ParserError({
          culpritToken: __privateGet(this, _currentToken),
          errorType: "UNEXPECTED_TOKEN"
        }));
        return null;
      }
      const attributeName = __privateGet(this, _currentToken);
      if (not(this.expectPeek(XmlTokenType.Equals))) {
        return null;
      }
      if (not(this.expectPeek(XmlTokenType.StringLiteral))) {
        return null;
      }
      return new XmlElementAttribute(attributeName, __privateGet(this, _currentToken));
    }
    parseXmlCommentNode() {
      assert(this.isCurrentToken(XmlTokenType.CommentLiteral), `Shouldn't call parseXmlCommentNode when current token is not a comment token`);
      return new XmlCommentNode(__privateGet(this, _currentToken));
    }
    parseXmlTextNode() {
      assert(this.isCurrentToken(XmlTokenType.TextNode), `Shouldn't call parseXmlTextNode when current token is not a text token`);
      return new XmlTextNode(__privateGet(this, _currentToken));
    }
  };
  _errors2 = new WeakMap();
  _currentToken = new WeakMap();
  _peekToken = new WeakMap();

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/build_indentation_space.js
  function buildIndentationSpace2({ indentationLevel, indentation }) {
    return Array.from({
      length: indentationLevel * indentation
    }).map(() => " ").join("");
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_xml_element_attribute.js
  function formatXmlElementAttribute(attribute) {
    return `${attribute.attributeName.tokenLiteral}="${attribute.value.tokenLiteral}"`;
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_xml_prolog_node.js
  function formatXmlPrologNode({ xmlPrologNode, indentationLevel, indentation }) {
    const localStringBuilder = [];
    localStringBuilder.push(buildIndentationSpace2({
      indentationLevel,
      indentation
    }) + `<?xml`);
    for (const attribute of xmlPrologNode.attributes) {
      localStringBuilder.push(formatXmlElementAttribute(attribute));
    }
    return localStringBuilder.join(" ") + `?>`;
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/sort_attributes.js
  function sortAttributes(attributes) {
    const sortedAttributes = [];
    let clonedAttributes = [
      ...attributes
    ];
    const moveAttributesToResult = (intermediateAttrs) => {
      if (intermediateAttrs.length === 0) {
        return;
      }
      sortedAttributes.push(...naiveSort(intermediateAttrs));
      clonedAttributes = clonedAttributes.filter((attr) => not(intermediateAttrs.includes(attr)));
    };
    const xmlnsAndroidAttr = clonedAttributes.find((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 2 && namespaces[0] === "xmlns" && namespaces[1] === "android";
    });
    if (xmlnsAndroidAttr) {
      moveAttributesToResult([
        xmlnsAndroidAttr
      ]);
    }
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length > 0 && namespaces[0] === "xmlns";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 2 && namespaces[0] === "android" && namespaces[1] === "id";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length > 0 && namespaces[0] === "android" && namespaces.at(-1) === "id";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 2 && namespaces[0] === "android" && namespaces[1] === "name";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length > 0 && namespaces[0] === "android" && namespaces.at(-1) === "name";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 1 && namespaces[0] === "name";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 1 && namespaces[0] === "style";
    }));
    moveAttributesToResult(clonedAttributes.filter((attr) => parseNamespaces(attr).length === 1));
    moveAttributesToResult(clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length > 1 && namespaces[0] === "android";
    }));
    moveAttributesToResult(clonedAttributes);
    return sortedAttributes;
  }
  function naiveSort(attributes) {
    return attributes.toSorted((attr1, attr2) => attr1.attributeName.tokenLiteral.localeCompare(attr2.attributeName.tokenLiteral));
  }
  function parseNamespaces(attr) {
    return attr.attributeName.tokenLiteral.split(":");
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_text_node.js
  function formatTextNode({ textNode, indentationLevel, indentation }) {
    return buildIndentationSpace2({
      indentationLevel,
      indentation
    }) + textNode.text.tokenLiteral.trim();
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_xml_tag_node.js
  function formatXmlTagNode({ xmlTagNode, indentationLevel, indentation, sortAttributes: shouldSortAttributes }) {
    const { tag, attributes, children } = xmlTagNode;
    const tagName = tag.tokenLiteral;
    const stringBuilder = [];
    stringBuilder.push(`${buildIndentationSpace2({
    indentationLevel,
    indentation
  })}<${tagName}`);
    if (attributes.length === 1) {
      stringBuilder[stringBuilder.length - 1] += " " + formatXmlElementAttribute(attributes[0]);
    } else if (attributes.length > 1) {
      (shouldSortAttributes ? sortAttributes(attributes) : attributes).map((attribute) => formatXmlElementAttribute(attribute)).forEach((formattedAttribute) => {
        stringBuilder.push(`${buildIndentationSpace2({
        indentation,
        indentationLevel: indentationLevel + 1
      })}${formattedAttribute}`);
      });
    }
    if (children.length === 0) {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + " />";
    } else {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + ">";
      if (children.length === 1 && children[0].astNodeType === "XML_TEXT_NODE") {
        return stringBuilder.join("\n") + formatTextNode({
          textNode: children[0],
          indentation,
          indentationLevel: 0
        }) + `</${tagName}>`;
      }
      for (const child of children) {
        stringBuilder.push(formatXmlExpression({
          expression: child,
          indentation,
          indentationLevel: indentationLevel + 1,
          sortAttributes: shouldSortAttributes
        }));
      }
      stringBuilder.push(`${buildIndentationSpace2({
      indentationLevel,
      indentation
    })}</${tagName}>`);
    }
    return stringBuilder.join("\n");
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_comment_node.js
  function formatCommentNode({ commentNode, indentationLevel, indentation }) {
    return buildIndentationSpace2({
      indentationLevel,
      indentation
    }) + `<!-- ${commentNode.comment.tokenLiteral.trim()} -->`;
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_xml_expression.js
  function formatXmlExpression({ expression, indentation, indentationLevel, sortAttributes: sortAttributes2 }) {
    if (expression instanceof XmlPrologNode) {
      return formatXmlPrologNode({
        xmlPrologNode: expression,
        indentationLevel,
        indentation
      });
    }
    if (expression instanceof XmlTagNode) {
      return formatXmlTagNode({
        xmlTagNode: expression,
        indentationLevel,
        indentation,
        sortAttributes: sortAttributes2
      });
    }
    if (expression instanceof XmlCommentNode) {
      return formatCommentNode({
        commentNode: expression,
        indentationLevel,
        indentation
      });
    }
    if (expression instanceof XmlTextNode) {
      return formatTextNode({
        textNode: expression,
        indentationLevel,
        indentation
      });
    }
    throw new Error(`Unexpected xml expression: ${expression.toString(0)}`, {
      cause: expression
    });
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_xml_program.js
  function formatXmlProgram({ program, indentation, sortAttributes: sortAttributes2 }) {
    const stringBuilder = [];
    for (const statement of program.statements) {
      stringBuilder.push(formatXmlExpression({
        expression: statement,
        indentation,
        indentationLevel: 0,
        sortAttributes: sortAttributes2
      }));
    }
    return stringBuilder.join("\n") + // empty line at the end
    "\n";
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format.js
  function format2(rawXml, { indentation = 4, sortAttributes: sortAttributes2 = true }) {
    try {
      const input = new StringLexerInput(rawXml);
      const inputReader = new LexerInputReader(input);
      const lexer = new Lexer(inputReader);
      const parser = new XmlParser(lexer);
      const program = parser.parseProgram();
      if (lexer.errors.length > 0) {
        return {
          type: "lexer-error",
          lexerErrors: lexer.errors
        };
      }
      if (parser.errors.length > 0) {
        return {
          type: "parser-error",
          parserErrors: parser.errors
        };
      }
      return {
        type: "success",
        formattedXml: formatXmlProgram({
          program,
          indentation,
          sortAttributes: sortAttributes2
        })
      };
    } catch (err) {
      return {
        type: "unknown-error",
        err
      };
    }
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/formatter_xml/format_wrapper.js
  function formatWrapper(text) {
    var _a2, _b;
    const response = format2(text, {
      sortAttributes: true,
      indentation: 4
    });
    if (response.type === "success") {
      return {
        type: "success",
        result: response.formattedXml
      };
    } else if (response.type === "lexer-error") {
      const [error] = response.lexerErrors;
      let errorMessage = "Unexpected lexer error...";
      if (error) {
        const { errorCategory, lineNumber, columnNumber } = error;
        switch (errorCategory.type) {
          case "ILLEGAL_CHARACTER":
            errorMessage = `Illegal character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
            break;
          case "INVALID_ESCAPE_CHARACTER_LITERAL":
            errorMessage = `Invalid escape character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
            break;
          case "INVALID_UNICODE_CHARACTER_LITERAL":
            errorMessage = `Invalid unicode character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
            break;
          case "UNCLOSED_COMMENT_LITERAL":
            errorMessage = `Unclosed comment at ${lineNumber}:${columnNumber}`;
            break;
          case "UNCLOSED_ESCAPE_SEQUENCE":
            errorMessage = `Unclosed escape sequence at ${lineNumber}:${columnNumber}`;
            break;
          case "UNCLOSED_STRING_LITERAL":
            errorMessage = `Unclosed string at ${lineNumber}:${columnNumber}`;
            break;
          case "UNEXPECTED_COMMENT_CHARACTER":
            errorMessage = `Unexpected comment character '${errorCategory.ch}' at ${lineNumber}:${columnNumber}`;
            break;
          default:
            errorMessage = `Unexpected lexer error at ${lineNumber}:${columnNumber}`;
            break;
        }
      }
      return {
        type: "error",
        errMessage: errorMessage
      };
    } else if (response.type === "parser-error") {
      const [error] = response.parserErrors;
      let errorMessage = "Unexpected parser error...";
      if (error) {
        const { errorType, culpritToken } = error;
        switch (errorType) {
          case "UNEXPECTED_CLOSING_TAG_LITERAL":
            errorMessage = `Unexpected closing tag '${culpritToken.tokenLiteral}' at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
            break;
          case "UNEXPECTED_EOF":
            errorMessage = `Unexpected end of file at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
            break;
          case "UNEXPECTED_PROLOG_TAG":
            errorMessage = `Expected 'xml' found '${culpritToken.tokenLiteral}' at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
            break;
          case "UNEXPECTED_TOKEN":
            errorMessage = `Unexpected token '${culpritToken.tokenLiteral}' at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
            break;
          default:
            errorMessage = `Unexpected parser error at ${culpritToken.lineNumber}:${culpritToken.columnNumber}`;
            break;
        }
      }
      return {
        type: "error",
        errMessage: errorMessage
      };
    }
    return {
      type: "error",
      errMessage: `Unexpected error occurred: ${(_b = (_a2 = response.err) == null ? void 0 : _a2.message) != null ? _b : "unknown error"}`
    };
  }

  // node_modules/@vighnesh153/tools/src/compiler_fe/lexer_kotlin/mod.js
  var mod_exports4 = {};

  exports.formatterXml = mod_exports3;
  exports.lexerCore = mod_exports;
  exports.lexerKotlin = mod_exports4;
  exports.lexerXml = mod_exports2;

  return exports;

})({});
