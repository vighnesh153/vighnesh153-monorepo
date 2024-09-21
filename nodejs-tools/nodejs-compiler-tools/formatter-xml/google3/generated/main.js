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

  // ../../nodejs-packages/tools-platform-independent/dist/main.js
  function not(value) {
    return !value;
  }
  function assert(condition, message = "Assertion failed") {
    if (not(condition)) {
      throw new Error(message);
    }
  }
  var DIGITS = "0123456789";
  var HEXADECIMAL_DIGITS = `${DIGITS}abcdefABCDEF`;
  var LOWERCASE_ALPHABET = `abcdefghijklmnopqrstuvwxyz`;
  var UPPERCASE_ALPHABET = LOWERCASE_ALPHABET.toUpperCase();
  var ALPHABET = LOWERCASE_ALPHABET + UPPERCASE_ALPHABET;
  function repeat(times, callback) {
    for (let i = 0; i < times; i++) {
      callback(i + 1);
    }
  }
  var LambdaFunctionNameList = ["initiateGoogleLogin", "initiateLogout", "googleAuthCallback"];
  LambdaFunctionNameList.reduce(
    (acc, curr) => {
      acc[curr] = curr;
      return acc;
    },
    {}
  );

  // ../lexer-core/dist/main.js
  var _errors, _a;
  var Lexer = (_a = class {
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
  }, _errors = new WeakMap(), _a);
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
  var _currentIndex, _peekIndex, _previousCharacter, _currentCharacter, _lineNumber, _columnNumber, _a2;
  var LexerInputReader = (_a2 = class {
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
      if (futureOffset < 0 || not(Number.isInteger(futureOffset))) {
        throw new Error(`Expected future offset to be a non-negative integer, found '${futureOffset}'`);
      }
      const peekIndex = __privateGet(this, _peekIndex) + futureOffset;
      if (peekIndex >= this.lexerInput.getSize()) {
        return EOF_CHARACTER;
      }
      return this.lexerInput.getCharacterAt(peekIndex);
    }
  }, _currentIndex = new WeakMap(), _peekIndex = new WeakMap(), _previousCharacter = new WeakMap(), _currentCharacter = new WeakMap(), _lineNumber = new WeakMap(), _columnNumber = new WeakMap(), _a2);

  // ../lexer-xml/dist/main.js
  var WHITE_SPACE_CHARACTERS = [" ", "	", "\n", "\r"];
  function skipWhitespace(lexer) {
    let currCh = lexer.inputReader.currentCharacter;
    while (currCh !== null && WHITE_SPACE_CHARACTERS.includes(currCh)) {
      lexer.inputReader.readNextCharacter();
      currCh = lexer.inputReader.currentCharacter;
    }
  }
  function readEscapeSequence(lexer) {
    assert(
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
    assert(
      lexer.inputReader.currentCharacter === "u",
      `You should not try to parse a unicode sequence that doesn't begin with 'u'`
    );
    const unicodeCharacters = [];
    repeat(4, () => {
      var _a8;
      const peek = (_a8 = lexer.inputReader.peekCharacter()) == null ? void 0 : _a8.toLowerCase();
      if (HEXADECIMAL_DIGITS.includes(`${peek}`.toLowerCase())) {
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
    assert(
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
    assert(
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
    return ALPHABET.includes(char) || char === "_";
  }
  function isAcceptableIdentifierCharacter(char) {
    if (char === null) {
      return false;
    }
    return isAcceptableIdentifierStart(char) || DIGITS.includes(char) || char === "-";
  }
  function readComment(lexer) {
    assert(
      lexer.inputReader.currentCharacter === "<" && lexer.inputReader.peekCharacter() === "!",
      `Don't attempt to read a comment if string doesn't start with '<!'`
    );
    lexer.inputReader.readNextCharacter();
    lexer.inputReader.readNextCharacter();
    let isValidCommentStart = true;
    repeat(2, () => {
      if (not(isValidCommentStart)) return;
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
  var _a3;
  var XmlTokenType = (_a3 = class {
    constructor(value) {
      this.value = value;
    }
  }, __publicField(_a3, "Illegal", new _a3("Illegal")), __publicField(_a3, "Eof", new _a3("Eof")), __publicField(_a3, "Identifier", new _a3("Identifier")), __publicField(_a3, "StringLiteral", new _a3("StringLiteral")), __publicField(_a3, "CommentLiteral", new _a3("CommentLiteral")), __publicField(_a3, "TextNode", new _a3("TextNode")), __publicField(_a3, "Colon", new _a3(":")), __publicField(_a3, "Equals", new _a3("=")), __publicField(_a3, "LeftAngleBracket", new _a3("<")), __publicField(_a3, "RightAngleBracket", new _a3(">")), __publicField(_a3, "ForwardSlash", new _a3("/")), __publicField(_a3, "QuestionMark", new _a3("?")), _a3);
  function nextToken(lexer) {
    let t;
    skipWhitespace(lexer);
    const currCh = lexer.inputReader.currentCharacter;
    switch (currCh) {
      case ":": {
        t = createToken(lexer, XmlTokenType.Colon);
        break;
      }
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
          t = createToken(lexer, XmlTokenType.Identifier, identifier, lineNumber, columnNumber);
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

  // ../parser-xml/dist/main.js
  function cloneToken(token) {
    return __spreadValues({}, token);
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
        culpritToken: this.culpritToken
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
  var _statements, _a4;
  var XmlProgram = (_a4 = class {
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
  }, _statements = new WeakMap(), _a4);
  var _attributes, _a5;
  var XmlPrologNode = (_a5 = class {
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
  }, _attributes = new WeakMap(), _a5);
  var _namespaces, _attributes2, _children, _a6;
  var XmlTagNode = (_a6 = class {
    constructor() {
      __publicField(this, "astNodeType", "XML_TAG_NODE");
      __privateAdd(this, _namespaces, []);
      __privateAdd(this, _attributes2, []);
      __privateAdd(this, _children, []);
    }
    get namespaces() {
      return [...__privateGet(this, _namespaces)];
    }
    get attributes() {
      return [...__privateGet(this, _attributes2)];
    }
    get children() {
      return [...__privateGet(this, _children)];
    }
    addNamespace(ns) {
      __privateGet(this, _namespaces).push(ns);
    }
    addAttribute(attribute) {
      __privateGet(this, _attributes2).push(attribute);
    }
    addChild(statement) {
      __privateGet(this, _children).push(statement);
    }
    toString(indentation = 0) {
      const { namespaces, attributes, children } = this;
      const tag = namespaces.map((ns) => ns.tokenLiteral).join(":");
      const stringBuilder = [];
      stringBuilder.push(`${buildIndentationSpace(indentation)}<${tag}`);
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
        return stringBuilder.join("\n") + children[0].toString(0) + `</${tag}>`;
      }
      for (const child of children) {
        stringBuilder.push(child.toString(indentation + 1));
      }
      if (children.length > 0) {
        stringBuilder.push(`${buildIndentationSpace(indentation)}</${tag}>`);
      }
      return stringBuilder.join("\n");
    }
  }, _namespaces = new WeakMap(), _attributes2 = new WeakMap(), _children = new WeakMap(), _a6);
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
  var _errors2, _currentToken, _peekToken, _a7;
  var XmlParser = (_a7 = class {
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
      if (this.isCurrentToken(XmlTokenType.LeftAngleBracket)) {
        if (this.isPeekToken(XmlTokenType.QuestionMark)) {
          return this.parseXmlPrologNode();
        }
        if (this.isPeekToken(XmlTokenType.Identifier)) {
          return this.parseXmlTagNode();
        }
        this.addError(
          new ParserError({
            errorType: "UNEXPECTED_TOKEN",
            culpritToken: __privateGet(this, _peekToken)
          })
        );
        return null;
      }
      if (this.isCurrentToken(XmlTokenType.CommentLiteral)) {
        return this.parseXmlCommentNode();
      }
      if (this.isCurrentToken(XmlTokenType.TextNode)) {
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
      assert(
        this.isCurrentToken(XmlTokenType.LeftAngleBracket),
        `Shouldn't call parseXmlPrologNode when current token is not '<'`
      );
      this.nextToken();
      assert(
        this.isCurrentToken(XmlTokenType.QuestionMark),
        `Shouldn't call parseXmlPrologNode when expression doesn't start with '<?'`
      );
      if (not(this.expectPeek(XmlTokenType.Identifier))) {
        return null;
      }
      if (__privateGet(this, _currentToken).tokenLiteral !== "xml") {
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
        if (this.isCurrentToken(XmlTokenType.Eof)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _currentToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
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
      assert(
        this.isCurrentToken(XmlTokenType.LeftAngleBracket),
        `Shouldn't call parseXmlTagNode when current token is not '<'`
      );
      this.nextToken();
      assert(
        this.isCurrentToken(XmlTokenType.Identifier),
        `Shouldn't call parseXmlTagNode when statement doesn't start with "<IDENTIFIER"`
      );
      const xmlTagNode = new XmlTagNode();
      xmlTagNode.addNamespace(__privateGet(this, _currentToken));
      this.nextToken();
      while (this.isCurrentToken(XmlTokenType.Colon)) {
        if (!this.expectPeek(XmlTokenType.Identifier)) {
          return null;
        }
        xmlTagNode.addNamespace(__privateGet(this, _currentToken));
        this.nextToken();
      }
      while (true) {
        if (this.isCurrentToken(XmlTokenType.Eof)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _currentToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
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
      assert(
        this.isCurrentToken(XmlTokenType.RightAngleBracket),
        `Expected ">" found ${__privateGet(this, _currentToken).tokenLiteral}`
      );
      this.nextToken();
      while (true) {
        if (this.isPeekToken(XmlTokenType.Eof)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _peekToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
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
      const closingTagNamespaces = [__privateGet(this, _currentToken)];
      this.nextToken();
      while (this.isCurrentToken(XmlTokenType.Colon)) {
        if (!this.expectPeek(XmlTokenType.Identifier)) {
          return null;
        }
        closingTagNamespaces.push(__privateGet(this, _currentToken));
        this.nextToken();
      }
      const openingTagName = xmlTagNode.namespaces.map((part) => part.tokenLiteral).join(":");
      const closingTagName = closingTagNamespaces.map((ns) => ns.tokenLiteral).join(":");
      if (openingTagName !== closingTagName) {
        this.addError(
          new ParserError({
            culpritToken: __spreadProps(__spreadValues({}, closingTagNamespaces[0]), {
              tokenLiteral: closingTagName
            }),
            errorType: "UNEXPECTED_CLOSING_TAG_LITERAL"
          })
        );
        return null;
      }
      if (not(this.isCurrentToken(XmlTokenType.RightAngleBracket))) {
        this.addError(
          new ParserError({
            culpritToken: __privateGet(this, _currentToken),
            errorType: "UNEXPECTED_TOKEN"
          })
        );
        return null;
      }
      return xmlTagNode;
    }
    parseAttribute() {
      if (not(this.isCurrentToken(XmlTokenType.Identifier))) {
        this.addError(
          new ParserError({
            culpritToken: __privateGet(this, _currentToken),
            errorType: "UNEXPECTED_TOKEN"
          })
        );
        return null;
      }
      const namespaces = [__privateGet(this, _currentToken)];
      while (true) {
        if (this.isPeekToken(XmlTokenType.Eof)) {
          this.addError(
            new ParserError({
              culpritToken: __privateGet(this, _peekToken),
              errorType: "UNEXPECTED_EOF"
            })
          );
          return null;
        }
        if (this.isPeekToken(XmlTokenType.Equals)) {
          break;
        }
        if (not(this.expectPeek(XmlTokenType.Colon))) {
          return null;
        }
        if (not(this.expectPeek(XmlTokenType.Identifier))) {
          return null;
        }
        namespaces.push(__privateGet(this, _currentToken));
      }
      assert(this.isPeekToken(XmlTokenType.Equals), `Expected "=" found ${__privateGet(this, _peekToken).tokenLiteral}`);
      this.nextToken();
      if (not(this.expectPeek(XmlTokenType.StringLiteral))) {
        return null;
      }
      return new XmlElementAttribute(namespaces, __privateGet(this, _currentToken));
    }
    parseXmlCommentNode() {
      assert(
        this.isCurrentToken(XmlTokenType.CommentLiteral),
        `Shouldn't call parseXmlCommentNode when current token is not a comment token`
      );
      return new XmlCommentNode(__privateGet(this, _currentToken));
    }
    parseXmlTextNode() {
      assert(
        this.isCurrentToken(XmlTokenType.TextNode),
        `Shouldn't call parseXmlTextNode when current token is not a text token`
      );
      return new XmlTextNode(__privateGet(this, _currentToken));
    }
  }, _errors2 = new WeakMap(), _currentToken = new WeakMap(), _peekToken = new WeakMap(), _a7);

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
      clonedAttributes = clonedAttributes.filter((attr) => not(intermediateAttrs.includes(attr)));
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
          var _a8;
          return attr.namespaces.length > 0 && attr.namespaces[0].tokenLiteral === "android" && ((_a8 = attr.namespaces.at(-1)) == null ? void 0 : _a8.tokenLiteral) === "id";
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
          var _a8;
          return attr.namespaces.length > 0 && attr.namespaces[0].tokenLiteral === "android" && ((_a8 = attr.namespaces.at(-1)) == null ? void 0 : _a8.tokenLiteral) === "name";
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
    const { namespaces, attributes, children } = xmlTagNode;
    const tagName = namespaces.map((ns) => ns.tokenLiteral).join(":");
    const stringBuilder = [];
    stringBuilder.push(`${buildIndentationSpace2({ indentationLevel, indentation })}<${tagName}`);
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
        return stringBuilder.join("\n") + formatTextNode({ textNode: children[0], indentation, indentationLevel: 0 }) + `</${tagName}>`;
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
      stringBuilder.push(`${buildIndentationSpace2({ indentationLevel, indentation })}</${tagName}>`);
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

})({});
