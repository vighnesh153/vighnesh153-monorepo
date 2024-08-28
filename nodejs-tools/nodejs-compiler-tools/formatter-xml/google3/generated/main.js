var pika_xml_formatter = (function (exports, assert2) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var assert2__default = /*#__PURE__*/_interopDefault(assert2);

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
  var __spreadValues = (a, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a, prop, b2[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
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

  // ../../node_modules/@vighnesh153/utils/dist/main.js
  function u(t) {
    return !t;
  }
  var b = "0123456789";
  var De = `${b}abcdefABCDEF`;
  var k = "abcdefghijklmnopqrstuvwxyz";
  var $ = k.toUpperCase();
  var W = k + $;
  function R(t, e) {
    for (let r = 0; r < t; r++) e(r + 1);
  }

  // ../lexer-core/dist/main.js
  var LexerError = class _LexerError {
    constructor(props) {
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
  var EOF_CHARACTER = null;
  var StringLexerInput = class {
    constructor(input) {
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
  var _currentIndex, _peekIndex, _previousCharacter, _currentCharacter, _lineNumber, _columnNumber, _a;
  var LexerInputReader = (_a = class {
    constructor(lexerInput) {
      __privateAdd(this, _currentIndex, -1);
      __privateAdd(this, _peekIndex, 0);
      __privateAdd(this, _previousCharacter, EOF_CHARACTER);
      __privateAdd(this, _currentCharacter, EOF_CHARACTER);
      __privateAdd(this, _lineNumber, 1);
      __privateAdd(this, _columnNumber, 0);
      this.lexerInput = lexerInput;
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
      if (futureOffset < 0 || u(Number.isInteger(futureOffset))) {
        throw new Error(`Expected future offset to be a non-negative integer, found '${futureOffset}'`);
      }
      const peekIndex = __privateGet(this, _peekIndex) + futureOffset;
      if (peekIndex >= this.lexerInput.getSize()) {
        return EOF_CHARACTER;
      }
      return this.lexerInput.getCharacterAt(peekIndex);
    }
  }, _currentIndex = new WeakMap(), _peekIndex = new WeakMap(), _previousCharacter = new WeakMap(), _currentCharacter = new WeakMap(), _lineNumber = new WeakMap(), _columnNumber = new WeakMap(), _a);
  var _errors, _a2;
  var XmlLexer = (_a2 = class {
    constructor(inputReader) {
      __privateAdd(this, _errors, []);
      __publicField(this, "currentToken", null);
      this.inputReader = inputReader;
    }
    get errors() {
      return __privateGet(this, _errors).map((error) => error.copy());
    }
    addError(error) {
      __privateGet(this, _errors).push(error);
    }
  }, _errors = new WeakMap(), _a2);
  var TokenType = class {
    constructor(value) {
      this.value = value;
    }
    serialized() {
      return {
        value: this.value
      };
    }
  };
  var TokenTypes = {
    ILLEGAL: new TokenType("ILLEGAL"),
    EOF: new TokenType("EOF"),
    IDENTIFIER: new TokenType("IDENTIFIER"),
    STRING_LITERAL: new TokenType("STRING_LITERAL"),
    COMMENT: new TokenType("COMMENT"),
    TEXT_NODE: new TokenType("TEXT_NODE"),
    COLON: new TokenType(":"),
    EQUALS: new TokenType("="),
    LEFT_ANGLE_BRACKET: new TokenType("<"),
    RIGHT_ANGLE_BRACKET: new TokenType(">"),
    FORWARD_SLASH: new TokenType("/"),
    QUESTION_MARK: new TokenType("?")
  };
  function cloneToken(token) {
    return __spreadValues({}, token);
  }
  function serializeToken(token) {
    return __spreadProps(__spreadValues({}, token), { tokenType: token.tokenType.serialized() });
  }
  var WHITE_SPACE_CHARACTERS = [" ", "	", "\n", "\r"];
  function skipWhitespace(lexer) {
    let currCh = lexer.inputReader.currentCharacter;
    while (currCh !== null && WHITE_SPACE_CHARACTERS.includes(currCh)) {
      lexer.inputReader.readNextCharacter();
      currCh = lexer.inputReader.currentCharacter;
    }
  }
  function readEscapeSequence(lexer) {
    assert2__default.default.ok(
      lexer.inputReader.currentCharacter === "\\",
      `You should not attempt to read an escaped sequence if it doesn't start with '\\'`
    );
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
        lexer.addError(
          new LexerError({
            errorCategory: {
              type: "UNCLOSED_ESCAPE_SEQUENCE"
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber
          })
        );
        return `
`;
      }
      default: {
        lexer.addError(
          new LexerError({
            errorCategory: {
              type: "INVALID_ESCAPE_CHARACTER_LITERAL",
              ch: lexer.inputReader.currentCharacter
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber
          })
        );
        return `
`;
      }
    }
  }
  function parseUnicode(lexer) {
    assert2__default.default.ok(
      lexer.inputReader.currentCharacter === "u",
      `You should not try to parse a unicode sequence that doesn't begin with 'u'`
    );
    const unicodeCharacters = [];
    R(4, () => {
      var _a7;
      const peek = (_a7 = lexer.inputReader.peekCharacter()) == null ? void 0 : _a7.toLowerCase();
      if (De.includes(`${peek}`.toLowerCase())) {
        lexer.inputReader.readNextCharacter();
        unicodeCharacters.push(lexer.inputReader.currentCharacter);
      } else {
        lexer.addError(
          new LexerError({
            errorCategory: {
              type: "INVALID_UNICODE_CHARACTER_LITERAL",
              ch: peek
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber
          })
        );
        return " ";
      }
    });
    return String.fromCharCode(parseInt(unicodeCharacters.join(""), 16));
  }
  var DOUBLE_QUOTE = '"';
  function readStringLiteral(lexer) {
    assert2__default.default.ok(
      lexer.inputReader.currentCharacter === DOUBLE_QUOTE,
      `You should not attempt to read a string literal if it doesn't start with '"'`
    );
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
      lexer.addError(
        new LexerError({
          errorCategory: {
            type: "UNCLOSED_STRING_LITERAL"
          },
          lineNumber: lexer.inputReader.lineNumber,
          columnNumber: lexer.inputReader.columnNumber
        })
      );
    }
    return stringLiteralBuilder.join("");
  }
  function readIdentifier(lexer) {
    assert2__default.default.ok(
      isAcceptableIdentifierCharacter(lexer.inputReader.currentCharacter),
      `You should not attempt to read an identifier which doesn't start with '_' or a letter`
    );
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
    return W.includes(char) || char === "_";
  }
  function isAcceptableIdentifierCharacter(char) {
    if (char === null) {
      return false;
    }
    return isAcceptableIdentifierStart(char) || b.includes(char) || char === "-";
  }
  function readComment(lexer) {
    assert2__default.default.ok(
      lexer.inputReader.currentCharacter === "<" && lexer.inputReader.peekCharacter() === "!",
      `Don't attempt to read a comment if string doesn't start with '<!'`
    );
    lexer.inputReader.readNextCharacter();
    lexer.inputReader.readNextCharacter();
    let isValidCommentStart = true;
    R(2, () => {
      if (lexer.inputReader.currentCharacter !== "-") {
        lexer.addError(
          new LexerError({
            errorCategory: {
              type: "UNEXPECTED_COMMENT_CHARACTER",
              ch: lexer.inputReader.currentCharacter
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber
          })
        );
        isValidCommentStart = false;
      }
      lexer.inputReader.readNextCharacter();
    });
    if (u(isValidCommentStart)) {
      return null;
    }
    const commentLiteralBuilder = [];
    while (true) {
      const currCh = lexer.inputReader.currentCharacter;
      if (currCh === EOF_CHARACTER) {
        lexer.addError(
          new LexerError({
            errorCategory: {
              type: "UNCLOSED_COMMENT_LITERAL"
            },
            lineNumber: lexer.inputReader.lineNumber,
            columnNumber: lexer.inputReader.columnNumber
          })
        );
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
  function nextToken(lexer) {
    var _a7;
    let t;
    skipWhitespace(lexer);
    const currCh = lexer.inputReader.currentCharacter;
    switch (currCh) {
      case ":": {
        t = createToken(lexer, TokenTypes.COLON);
        break;
      }
      case "=": {
        t = createToken(lexer, TokenTypes.EQUALS);
        break;
      }
      case "<": {
        if (lexer.inputReader.peekCharacter() === "!") {
          const { lineNumber, columnNumber } = lexer.inputReader;
          const commentLiteral = readComment(lexer);
          if (commentLiteral !== null) {
            t = createToken(lexer, TokenTypes.COMMENT, commentLiteral, lineNumber, columnNumber);
          } else {
            t = createToken(lexer, TokenTypes.ILLEGAL);
          }
        } else {
          t = createToken(lexer, TokenTypes.LEFT_ANGLE_BRACKET);
        }
        break;
      }
      case ">": {
        t = createToken(lexer, TokenTypes.RIGHT_ANGLE_BRACKET);
        break;
      }
      case "/": {
        t = createToken(lexer, TokenTypes.FORWARD_SLASH);
        break;
      }
      case "?": {
        t = createToken(lexer, TokenTypes.QUESTION_MARK);
        break;
      }
      case '"': {
        const { lineNumber, columnNumber } = lexer.inputReader;
        const s = readStringLiteral(lexer);
        t = createToken(lexer, TokenTypes.STRING_LITERAL, s, lineNumber, columnNumber);
        break;
      }
      case EOF_CHARACTER: {
        t = createToken(lexer, TokenTypes.EOF);
        break;
      }
      default: {
        if (((_a7 = lexer.currentToken) == null ? void 0 : _a7.tokenType) === TokenTypes.RIGHT_ANGLE_BRACKET) {
          const { lineNumber, columnNumber } = lexer.inputReader;
          const textNode = readTextNode(lexer);
          t = createToken(lexer, TokenTypes.TEXT_NODE, textNode, lineNumber, columnNumber);
        } else if (isAcceptableIdentifierStart(currCh)) {
          const { lineNumber, columnNumber } = lexer.inputReader;
          const identifier = readIdentifier(lexer);
          t = createToken(lexer, TokenTypes.IDENTIFIER, identifier, lineNumber, columnNumber);
        } else {
          lexer.addError(
            new LexerError({
              errorCategory: {
                type: "ILLEGAL_CHARACTER",
                ch: currCh
              },
              lineNumber: lexer.inputReader.lineNumber,
              columnNumber: lexer.inputReader.columnNumber
            })
          );
          t = createToken(lexer, TokenTypes.ILLEGAL, currCh);
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
  var ParserError = class _ParserError {
    constructor(props) {
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
        culpritToken: serializeToken(this.culpritToken)
      };
    }
  };
  var XmlElementAttribute = class {
    constructor(namespaces, value) {
      this.namespaces = namespaces;
      this.value = value;
    }
    toString() {
      return `${this.namespaces.map((namespace) => namespace.tokenLiteral).join(":")}="${this.value.tokenLiteral}"`;
    }
  };
  var _statements, _a3;
  var XmlProgram = (_a3 = class {
    constructor() {
      __publicField(this, "astNodeType", "XML_PROGRAM");
      __privateAdd(this, _statements, []);
    }
    get statements() {
      return [...__privateGet(this, _statements)];
    }
    addStatement(statement) {
      __privateGet(this, _statements).push(statement);
    }
    toString(indentation) {
      return __privateGet(this, _statements).map((statement) => statement.toString(indentation)).join("\n");
    }
  }, _statements = new WeakMap(), _a3);
  var _attributes, _a4;
  var XmlPrologNode = (_a4 = class {
    constructor() {
      __publicField(this, "astNodeType", "XML_PROLOG_NODE");
      __privateAdd(this, _attributes, []);
    }
    get attributes() {
      return [...__privateGet(this, _attributes)];
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
  }, _attributes = new WeakMap(), _a4);
  var _tagIdentifier, _attributes2, _children, _a5;
  var XmlTagNode = (_a5 = class {
    constructor(tagIdentifier) {
      __publicField(this, "astNodeType", "XML_TAG_NODE");
      __privateAdd(this, _tagIdentifier);
      __privateAdd(this, _attributes2, []);
      __privateAdd(this, _children, []);
      __privateSet(this, _tagIdentifier, tagIdentifier);
    }
    get tagIdentifier() {
      return __privateGet(this, _tagIdentifier);
    }
    get attributes() {
      return [...__privateGet(this, _attributes2)];
    }
    get children() {
      return [...__privateGet(this, _children)];
    }
    addAttribute(attribute) {
      __privateGet(this, _attributes2).push(attribute);
    }
    addChild(statement) {
      __privateGet(this, _children).push(statement);
    }
    toString(indentation = 0) {
      const { tagIdentifier, attributes, children } = this;
      const stringBuilder = [];
      stringBuilder.push(`${buildIndentationSpace(indentation)}<${tagIdentifier.tokenLiteral}`);
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
        return stringBuilder.join("\n") + children[0].toString(0) + `</${tagIdentifier.tokenLiteral}>`;
      }
      for (const child of children) {
        stringBuilder.push(child.toString(indentation + 1));
      }
      if (children.length > 0) {
        stringBuilder.push(`${buildIndentationSpace(indentation)}</${tagIdentifier.tokenLiteral}>`);
      }
      return stringBuilder.join("\n");
    }
  }, _tagIdentifier = new WeakMap(), _attributes2 = new WeakMap(), _children = new WeakMap(), _a5);
  var XmlCommentNode = class {
    constructor(comment) {
      __publicField(this, "astNodeType", "XML_COMMENT_NODE");
      this.comment = comment;
    }
    toString(indentation) {
      return `${buildIndentationSpace(indentation)}<!-- ${this.comment.tokenLiteral.trim()} -->`;
    }
  };
  function buildIndentationSpace(indentation) {
    return Array.from({ length: indentation * 4 }).map(() => " ").join("");
  }
  var XmlTextNode = class {
    constructor(text) {
      __publicField(this, "astNodeType", "XML_TEXT_NODE");
      this.text = text;
    }
    toString(indentation) {
      return `${buildIndentationSpace(indentation)}${this.text.tokenLiteral.trim()}`;
    }
  };
  var _errors2, _currentToken, _peekToken, _a6;
  var XmlParser = (_a6 = class {
    constructor(lexer) {
      __privateAdd(this, _errors2, []);
      __privateAdd(this, _currentToken);
      __privateAdd(this, _peekToken);
      this.lexer = lexer;
      this.nextToken();
      this.nextToken();
    }
    get errors() {
      return __privateGet(this, _errors2).map((error) => error.copy());
    }
    parseProgram() {
      const program = new XmlProgram();
      while (u(this.isCurrentToken(TokenTypes.EOF))) {
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
      this.addError(
        new ParserError({
          errorType: "UNEXPECTED_TOKEN",
          culpritToken: __privateGet(this, _peekToken)
        })
      );
      return false;
    }
    nextToken() {
      if (__privateGet(this, _peekToken)) {
        __privateSet(this, _currentToken, __privateGet(this, _peekToken));
      }
      __privateSet(this, _peekToken, nextToken(this.lexer));
    }
    parseStatement() {
      if (this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET)) {
        if (this.isPeekToken(TokenTypes.QUESTION_MARK)) {
          return this.parseXmlPrologNode();
        }
        if (this.isPeekToken(TokenTypes.IDENTIFIER)) {
          return this.parseXmlTagNode();
        }
      }
      if (this.isCurrentToken(TokenTypes.COMMENT)) {
        return this.parseXmlCommentNode();
      }
      if (this.isCurrentToken(TokenTypes.TEXT_NODE)) {
        return this.parseXmlTextNode();
      }
      this.addError(
        new ParserError({
          errorType: "UNEXPECTED_TOKEN",
          culpritToken: __privateGet(this, _currentToken)
        })
      );
      return null;
    }
    parseXmlPrologNode() {
      assert2__default.default.ok(
        this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET),
        `Shouldn't call parseXmlPrologNode when current token is not '<'`
      );
      this.nextToken();
      assert2__default.default.ok(
        this.isCurrentToken(TokenTypes.QUESTION_MARK),
        `Shouldn't call parseXmlPrologNode when expression doesn't start with '<?'`
      );
      if (u(this.expectPeek(TokenTypes.IDENTIFIER))) {
        return null;
      }
      if (u(__privateGet(this, _currentToken).tokenLiteral === "xml")) {
        this.addError(
          new ParserError({
            errorType: "UNEXPECTED_PROLOG_TAG",
            culpritToken: __privateGet(this, _currentToken)
          })
        );
        return null;
      }
      this.nextToken();
      const xmlPrologNode = new XmlPrologNode();
      while (true) {
        if (this.isCurrentToken(TokenTypes.EOF)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _currentToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
          return null;
        }
        if (this.isCurrentToken(TokenTypes.QUESTION_MARK)) {
          if (u(this.expectPeek(TokenTypes.RIGHT_ANGLE_BRACKET))) {
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
      assert2__default.default.ok(
        this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET),
        `Shouldn't call parseXmlTagNode when current token is not '<'`
      );
      this.nextToken();
      const xmlTagNode = new XmlTagNode(__privateGet(this, _currentToken));
      this.nextToken();
      while (true) {
        if (this.isCurrentToken(TokenTypes.EOF)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _currentToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
          return null;
        }
        if (this.isCurrentToken(TokenTypes.FORWARD_SLASH)) {
          break;
        }
        if (this.isCurrentToken(TokenTypes.RIGHT_ANGLE_BRACKET)) {
          break;
        }
        const attribute = this.parseAttribute();
        if (attribute === null) {
          return null;
        }
        xmlTagNode.addAttribute(attribute);
        this.nextToken();
      }
      if (this.isCurrentToken(TokenTypes.FORWARD_SLASH)) {
        if (u(this.expectPeek(TokenTypes.RIGHT_ANGLE_BRACKET))) {
          return null;
        }
        return xmlTagNode;
      }
      this.nextToken();
      while (true) {
        if (this.isPeekToken(TokenTypes.EOF)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _peekToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
          return null;
        }
        if (this.isCurrentToken(TokenTypes.LEFT_ANGLE_BRACKET) && this.isPeekToken(TokenTypes.FORWARD_SLASH)) {
          break;
        }
        const statement = this.parseStatement();
        if (statement === null) {
          return null;
        }
        xmlTagNode.addChild(statement);
        this.nextToken();
      }
      this.nextToken();
      if (u(this.expectPeek(TokenTypes.IDENTIFIER))) {
        return null;
      }
      if (__privateGet(this, _currentToken).tokenLiteral !== xmlTagNode.tagIdentifier.tokenLiteral) {
        this.addError(
          new ParserError({
            culpritToken: __privateGet(this, _currentToken),
            errorType: "UNEXPECTED_CLOSING_TAG_LITERAL"
          })
        );
        return null;
      }
      this.nextToken();
      return xmlTagNode;
    }
    parseAttribute() {
      assert2__default.default.ok(
        this.isCurrentToken(TokenTypes.IDENTIFIER),
        `Shouldn't call parseAttribute when current token is not an identifier`
      );
      const keys = [__privateGet(this, _currentToken)];
      while (true) {
        if (this.isPeekToken(TokenTypes.EOF)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _peekToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
          return null;
        }
        if (this.isPeekToken(TokenTypes.EQUALS)) {
          break;
        }
        if (u(this.expectPeek(TokenTypes.COLON))) {
          return null;
        }
        if (u(this.expectPeek(TokenTypes.IDENTIFIER))) {
          return null;
        }
        keys.push(__privateGet(this, _currentToken));
      }
      this.nextToken();
      if (u(this.expectPeek(TokenTypes.STRING_LITERAL))) {
        return null;
      }
      return new XmlElementAttribute(keys, __privateGet(this, _currentToken));
    }
    parseXmlCommentNode() {
      assert2__default.default.ok(
        this.isCurrentToken(TokenTypes.COMMENT),
        `Shouldn't call parseXmlCommentNode when current token is not a comment token`
      );
      return new XmlCommentNode(__privateGet(this, _currentToken));
    }
    parseXmlTextNode() {
      assert2__default.default.ok(
        this.isCurrentToken(TokenTypes.TEXT_NODE),
        `Shouldn't call parseXmlTextNode when current token is not a text token`
      );
      return new XmlTextNode(__privateGet(this, _currentToken));
    }
  }, _errors2 = new WeakMap(), _currentToken = new WeakMap(), _peekToken = new WeakMap(), _a6);

  // src/build_indentation_space.ts
  function buildIndentationSpace2({ indentationLevel, indentation }) {
    return Array.from({ length: indentationLevel * indentation }).map(() => " ").join("");
  }

  // src/format_xml_element_attribute.ts
  function formatXmlElementAttribute({ namespaces, value }) {
    const combinedNamespace = namespaces.map((namespace) => namespace.tokenLiteral).join(":");
    return `${combinedNamespace}="${value.tokenLiteral}"`;
  }

  // src/format_xml_prolog_node.ts
  function formatXmlPrologNode({
    xmlPrologNode,
    indentationLevel,
    indentation
  }) {
    const localStringBuilder = [];
    localStringBuilder.push(buildIndentationSpace2({ indentationLevel, indentation }) + `<?xml`);
    for (const attribute of xmlPrologNode.attributes) {
      localStringBuilder.push(formatXmlElementAttribute(attribute));
    }
    return localStringBuilder.join(" ") + `?>`;
  }

  // src/sort_attributes.ts
  function sortAttributes(attributes) {
    const sortedAttributes = [];
    let clonedAttributes = [...attributes];
    const moveAttributesToResult = (intermediateAttrs) => {
      if (intermediateAttrs.length === 0) {
        return;
      }
      sortedAttributes.push(...naiveSort(intermediateAttrs));
      clonedAttributes = clonedAttributes.filter((attr) => u(intermediateAttrs.includes(attr)));
    };
    const xmlnsAndroidAttr = clonedAttributes.find(
      (attr) => attr.namespaces.length === 2 && attr.namespaces[0].tokenLiteral === "xmlns" && attr.namespaces[1].tokenLiteral === "android"
    );
    if (xmlnsAndroidAttr) {
      moveAttributesToResult([xmlnsAndroidAttr]);
    }
    moveAttributesToResult(
      clonedAttributes.filter((attr) => attr.namespaces.length > 0 && attr.namespaces[0].tokenLiteral === "xmlns")
    );
    moveAttributesToResult(
      clonedAttributes.filter(
        (attr) => attr.namespaces.length === 2 && attr.namespaces[0].tokenLiteral === "android" && attr.namespaces[1].tokenLiteral === "id"
      )
    );
    moveAttributesToResult(
      clonedAttributes.filter(
        (attr) => {
          var _a7;
          return attr.namespaces.length > 0 && attr.namespaces[0].tokenLiteral === "android" && ((_a7 = attr.namespaces.at(-1)) == null ? void 0 : _a7.tokenLiteral) === "id";
        }
      )
    );
    moveAttributesToResult(
      clonedAttributes.filter(
        (attr) => attr.namespaces.length === 2 && attr.namespaces[0].tokenLiteral === "android" && attr.namespaces[1].tokenLiteral === "name"
      )
    );
    moveAttributesToResult(
      clonedAttributes.filter(
        (attr) => {
          var _a7;
          return attr.namespaces.length > 0 && attr.namespaces[0].tokenLiteral === "android" && ((_a7 = attr.namespaces.at(-1)) == null ? void 0 : _a7.tokenLiteral) === "name";
        }
      )
    );
    moveAttributesToResult(
      clonedAttributes.filter((attr) => attr.namespaces.length === 1 && attr.namespaces[0].tokenLiteral === "name")
    );
    moveAttributesToResult(
      clonedAttributes.filter((attr) => attr.namespaces.length === 1 && attr.namespaces[0].tokenLiteral === "style")
    );
    moveAttributesToResult(clonedAttributes.filter((attr) => attr.namespaces.length === 1));
    moveAttributesToResult(
      clonedAttributes.filter((attr) => attr.namespaces.length > 1 && attr.namespaces[0].tokenLiteral === "android")
    );
    moveAttributesToResult(clonedAttributes);
    return sortedAttributes;
  }
  function naiveSort(attributes) {
    return attributes.toSorted((attr1, attr2) => {
      const combinedKey1 = attr1.namespaces.map((ns) => ns.tokenLiteral).join(":");
      const combinedKey2 = attr2.namespaces.map((ns) => ns.tokenLiteral).join(":");
      return combinedKey1.localeCompare(combinedKey2);
    });
  }

  // src/format_text_node.ts
  function formatTextNode({ textNode, indentationLevel, indentation }) {
    return buildIndentationSpace2({ indentationLevel, indentation }) + textNode.text.tokenLiteral.trim();
  }

  // src/format_xml_tag_node.ts
  function formatXmlTagNode({
    xmlTagNode,
    indentationLevel,
    indentation,
    sortAttributes: shouldSortAttributes
  }) {
    const { tagIdentifier, attributes, children } = xmlTagNode;
    const stringBuilder = [];
    stringBuilder.push(`${buildIndentationSpace2({ indentationLevel, indentation })}<${tagIdentifier.tokenLiteral}`);
    if (attributes.length === 1) {
      stringBuilder[stringBuilder.length - 1] += " " + formatXmlElementAttribute(attributes[0]);
    } else if (attributes.length > 1) {
      (shouldSortAttributes ? sortAttributes(attributes) : attributes).map((attribute) => formatXmlElementAttribute(attribute)).forEach((formattedAttribute) => {
        stringBuilder.push(
          `${buildIndentationSpace2({ indentation, indentationLevel: indentationLevel + 1 })}${formattedAttribute}`
        );
      });
    }
    if (children.length === 0) {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + " />";
    } else {
      stringBuilder[stringBuilder.length - 1] = stringBuilder.at(-1) + ">";
      if (children.length === 1 && children[0].astNodeType === "XML_TEXT_NODE") {
        return stringBuilder.join("\n") + formatTextNode({ textNode: children[0], indentation, indentationLevel: 0 }) + `</${tagIdentifier.tokenLiteral}>`;
      }
      for (const child of children) {
        stringBuilder.push(
          formatXmlExpression({
            expression: child,
            indentation,
            indentationLevel: indentationLevel + 1,
            sortAttributes: shouldSortAttributes
          })
        );
      }
      stringBuilder.push(`${buildIndentationSpace2({ indentationLevel, indentation })}</${tagIdentifier.tokenLiteral}>`);
    }
    return stringBuilder.join("\n");
  }

  // src/format_comment_node.ts
  function formatCommentNode({ commentNode, indentationLevel, indentation }) {
    return buildIndentationSpace2({ indentationLevel, indentation }) + `<!-- ${commentNode.comment.tokenLiteral.trim()} -->`;
  }

  // src/format_xml_expression.ts
  function formatXmlExpression({
    expression,
    indentation,
    indentationLevel,
    sortAttributes: sortAttributes2
  }) {
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

  // src/format_xml_program.ts
  function formatXmlProgram({ program, indentation, sortAttributes: sortAttributes2 }) {
    const stringBuilder = [];
    for (const statement of program.statements) {
      stringBuilder.push(
        formatXmlExpression({ expression: statement, indentation, indentationLevel: 0, sortAttributes: sortAttributes2 })
      );
    }
    return stringBuilder.join("\n") + // empty line at the end
    "\n";
  }

  // src/index.ts
  function format(rawXml, { indentation = 4, sortAttributes: sortAttributes2 = true }) {
    try {
      const input = new StringLexerInput(rawXml);
      const inputReader = new LexerInputReader(input);
      const lexer = new XmlLexer(inputReader);
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
        formattedXml: formatXmlProgram({ program, indentation, sortAttributes: sortAttributes2 })
      };
    } catch (err) {
      return {
        type: "unknown-error",
        err
      };
    }
  }

  exports.format = format;

  return exports;

})({}, assert2);
