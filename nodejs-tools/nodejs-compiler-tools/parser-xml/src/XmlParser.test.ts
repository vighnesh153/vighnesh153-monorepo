/* eslint-disable max-len */
import { test, expect } from 'vitest';
import { Lexer, LexerInputReader, StringLexerInput } from '@vighnesh153/lexer-core';
import { XmlTokenType } from '@vighnesh153/lexer-xml';
import { XmlParser } from './XmlParser';
import { XmlProgram } from './ast';

function parseProgram(input: string): [XmlParser, XmlProgram] {
  const stringInput = new StringLexerInput(input);
  const inputReader = new LexerInputReader(stringInput);
  const lexer = new Lexer<XmlTokenType>(inputReader);
  const parser = new XmlParser(lexer);

  return [parser, parser.parseProgram()];
}

test('should parse empty xml input', () => {
  const [parser, program] = parseProgram('');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements).toStrictEqual([]);
});

test('should parse prolog tag without attributes', () => {
  const [parser, program] = parseProgram('< ? xml ? >');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"<?xml?>"`);
});

test('should parse prolog tag with attributes', () => {
  const [parser, program] = parseProgram('< ? xml version  =  "1.0" encoding ="UTF-8" ? >');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"<?xml version="1.0" encoding="UTF-8"?>"`);
});

test('should parse empty self-closing tag', () => {
  const [parser, program] = parseProgram('< manifest / >');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"<manifest />"`);
});

test('should parse empty tag', () => {
  const [parser, program] = parseProgram('< manifest > < /   manifest>');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"<manifest />"`);
});

test('should parse tag with single simple attribute', () => {
  const [parser, program] = parseProgram('< manifest package="com.pokemon.pikachu" / >');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"<manifest package="com.pokemon.pikachu" />"`);
});

test('should parse tag with multiple simple attributes', () => {
  const [parser, program] = parseProgram('< manifest package= "com.pokemon.pikachu" attr2  =   "2.0" / >');

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`
    "<manifest
        package="com.pokemon.pikachu"
        attr2="2.0" />"
  `);
});

test('should parse tag with colon separated attributes', () => {
  const [parser, program] = parseProgram(
    `<uses-feature      android :    name   =    
    
    "android.hardware.touchscreen" 
    
    android
    
    :
    
    required      =
    "false" />`
  );

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`
    "<uses-feature
        android:name="android.hardware.touchscreen"
        android:required="false" />"
  `);
});

test('should be able to read tags with namespaces', () => {
  const [parser, program] = parseProgram(
    '< namespace1 : namespace2 : namespace3 > </ namespace1 : namespace2 : namespace3>'
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"<namespace1:namespace2:namespace3 />"`);
});

test('should parse naked text node', () => {
  const [parser, program] = parseProgram('pikachu');

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`"pikachu"`);
});

test('should parse tag with children', () => {
  const [parser, program] = parseProgram(
    `
    <?xml 
    
    
    
    
    version="1.0" encoding="utf-8" ?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.pokemon.charizard">
        <uses-feature android:name="android.hardware.touchscreen" android:required="false" />
        <!-- 
        
        
        
        <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> 
        
        
        -->

        <application
            android:allowBackup="true"
            android:label="Pikachu"
            android:supportsRtl="true"
                        >
            <receiver
                android:name=".MyReceiver"
                android:enabled="true"
                android:exported="true">
                <intent-filter>
                    <action android:name="SOME_INTENT_FILTER_1" />
                    <action android:name="SOME_INTENT_FILTER_2" 
                    />
                </intent-filter>
            </receiver>

            <activity
                android:name=".MainActivity"
                android:exported="true"
                android:launchMode="singleTask">
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LAUNCHER" />
                </intent-filter>
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                </intent-filter>
            </activity>
      </application>
    </manifest>

    `
  );

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(2);
  expect(program.toString(0)).toMatchInlineSnapshot(`
    "<?xml version="1.0" encoding="utf-8"?>
    <manifest
        xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.pokemon.charizard">
        <uses-feature
            android:name="android.hardware.touchscreen"
            android:required="false" />
        <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->
        <application
            android:allowBackup="true"
            android:label="Pikachu"
            android:supportsRtl="true">
            <receiver
                android:name=".MyReceiver"
                android:enabled="true"
                android:exported="true">
                <intent-filter>
                    <action android:name="SOME_INTENT_FILTER_1" />
                    <action android:name="SOME_INTENT_FILTER_2" />
                </intent-filter>
            </receiver>
            <activity
                android:name=".MainActivity"
                android:exported="true"
                android:launchMode="singleTask">
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LAUNCHER" />
                </intent-filter>
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                </intent-filter>
            </activity>
        </application>
    </manifest>"
  `);
});

test('should parse tag with text node children and attributes', () => {
  const [parser, program] = parseProgram(`
    <    pokemon >
      <name
    >
      Pikachu<
    /
    
    name
>
      <
types    comma-separated   =  "true"    >    
      electric, god<  /
      types>
      <
      desc
      >
        
  Best pokemon ever!!!
      
                      </
                  desc    ><
                      /pokemon
                      >
    `);

  expect(parser.errors).toStrictEqual([]);
  expect(program.statements.length).toBe(1);
  expect(program.toString(0)).toMatchInlineSnapshot(`
    "<pokemon>
        <name>Pikachu</name>
        <types comma-separated="true">electric, god</types>
        <desc>Best pokemon ever!!!</desc>
    </pokemon>"
  `);
});

test('should return error if incorrect token position', () => {
  const [parser, program] = parseProgram('?');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 1,
      lineNumber: 1,
      tokenLiteral: '?',
      tokenType: XmlTokenType.QuestionMark,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if EOF while reading attribute', () => {
  const [parser, program] = parseProgram('< manifest fruit');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 16,
      lineNumber: 1,
      tokenLiteral: 'Eof',
      tokenType: XmlTokenType.Eof,
    },
    errorType: 'UNEXPECTED_EOF',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if identifier token after identifier token instead of colon while parsing attribute', () => {
  const [parser, program] = parseProgram('< manifest pokemon fruit="orange" / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 20,
      lineNumber: 1,
      tokenLiteral: 'fruit',
      tokenType: XmlTokenType.Identifier,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if equals token after colon token instead of identifier while parsing attribute', () => {
  const [parser, program] = parseProgram('< manifest fruit:="orange" / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 18,
      lineNumber: 1,
      tokenLiteral: '=',
      tokenType: XmlTokenType.Equals,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if identifier token after equals while parsing attribute', () => {
  const [parser, program] = parseProgram('< manifest fruit= orange / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 19,
      lineNumber: 1,
      tokenLiteral: 'orange',
      tokenType: XmlTokenType.Identifier,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if identifier token after equals while parsing attribute in xml prolog', () => {
  const [parser, program] = parseProgram('<? xml fruit= orange ?>');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 15,
      lineNumber: 1,
      tokenLiteral: 'orange',
      tokenType: XmlTokenType.Identifier,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if EOF while parsing xml prolog', () => {
  const [parser, program] = parseProgram('<? xml  ');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 8,
      lineNumber: 1,
      tokenLiteral: 'Eof',
      tokenType: XmlTokenType.Eof,
    },
    errorType: 'UNEXPECTED_EOF',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if EOF while parsing xml tag', () => {
  const [parser, program] = parseProgram('< manifest  ');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: 'Eof',
      tokenType: XmlTokenType.Eof,
    },
    errorType: 'UNEXPECTED_EOF',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if incorrect token after closing question mark in xml prolog', () => {
  const [parser, program] = parseProgram('<? xml  ? <');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 11,
      lineNumber: 1,
      tokenLiteral: '<',
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error while parsing xml prolog if incorrect token after <?', () => {
  const [parser, program] = parseProgram('<? ?>');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 4,
      lineNumber: 1,
      tokenLiteral: '?',
      tokenType: XmlTokenType.QuestionMark,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error while parsing xml prolog if tag is not xml', () => {
  const [parser, program] = parseProgram('<? manifest  ?>');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 4,
      lineNumber: 1,
      tokenLiteral: 'manifest',
      tokenType: XmlTokenType.Identifier,
    },
    errorType: 'UNEXPECTED_PROLOG_TAG',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if incorrect token while parsing self closing xml tag', () => {
  const [parser, program] = parseProgram('< manifest  / <');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 15,
      lineNumber: 1,
      tokenLiteral: '<',
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if EOF while parsing children of xml tag', () => {
  const [parser, program] = parseProgram('< manifest >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: 'Eof',
      tokenType: XmlTokenType.Eof,
    },
    errorType: 'UNEXPECTED_EOF',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if error while parsing children of xml tag', () => {
  const [parser, program] = parseProgram('< manifest > <child-tag /< </manifest>');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 26,
      lineNumber: 1,
      tokenLiteral: '<',
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if incorrect token at end of tag', () => {
  const [parser, program] = parseProgram('< manifest > </ ?');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 17,
      lineNumber: 1,
      tokenLiteral: '?',
      tokenType: XmlTokenType.QuestionMark,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test(`should return error if start and close tag don't match`, () => {
  const [parser, program] = parseProgram('< manifest > </ pokemon>');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 17,
      lineNumber: 1,
      tokenLiteral: 'pokemon',
      tokenType: XmlTokenType.Identifier,
    },
    errorType: 'UNEXPECTED_CLOSING_TAG_LITERAL',
  });
  expect(program.statements.length).toBe(0);
});

test('should return errors if equals without identifier', () => {
  const [parser, program] = parseProgram('< manifest ="com.pokemon.pikachu" / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: '=',
      tokenType: XmlTokenType.Equals,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return errors if "<" instead of ">" in closing tag literal', () => {
  const [parser, program] = parseProgram('< tag > </ tag <');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 16,
      lineNumber: 1,
      tokenLiteral: '<',
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return errors if nameless tag', () => {
  const [parser, program] = parseProgram('< >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 3,
      lineNumber: 1,
      tokenLiteral: '>',
      tokenType: XmlTokenType.RightAngleBracket,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error when unexpected token after ":" in tag name', () => {
  const [parser, program] = parseProgram('< ns1 : ns2 :  /> ');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 16,
      lineNumber: 1,
      tokenLiteral: '/',
      tokenType: XmlTokenType.ForwardSlash,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test(`should return error if start and end tag names don't match`, () => {
  const [parser, program] = parseProgram('< ns1 : ns2  > </ ns3 :  ns4> ');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 19,
      lineNumber: 1,
      tokenLiteral: 'ns3:ns4',
      tokenType: XmlTokenType.Identifier,
    },
    errorType: 'UNEXPECTED_CLOSING_TAG_LITERAL',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error when unexpected token after ":" in in closing tag name', () => {
  const [parser, program] = parseProgram('< ns1 : ns2  > </ ns1 : ns2: >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 30,
      lineNumber: 1,
      tokenLiteral: '>',
      tokenType: XmlTokenType.RightAngleBracket,
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});
