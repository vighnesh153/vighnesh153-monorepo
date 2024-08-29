/* eslint-disable max-len */
import { test, expect } from 'vitest';
import { LexerInputReader, StringLexerInput } from '@vighnesh153/lexer-core';
import { XmlLexer } from '@vighnesh153/lexer-xml';
import { XmlParser } from './XmlParser';
import { XmlProgram } from './ast';

function parseProgram(input: string): [XmlParser, XmlProgram] {
  const stringInput = new StringLexerInput(input);
  const inputReader = new LexerInputReader(stringInput);
  const lexer = new XmlLexer(inputReader);
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

test('should return errors if equals without identifier', () => {
  const [parser, program] = parseProgram('< manifest ="com.pokemon.pikachu" / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: '=',
      tokenType: {
        value: '=',
      },
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
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

test('should parse tag with text nodes and properties', () => {
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

test('should return error if incorrect token position', () => {
  const [parser, program] = parseProgram('manifest');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 1,
      lineNumber: 1,
      tokenLiteral: 'manifest',
      tokenType: {
        value: 'IDENTIFIER',
      },
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
      tokenLiteral: 'EOF',
      tokenType: {
        value: 'EOF',
      },
    },
    errorType: 'UNEXPECTED_EOF',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if identifier token after identifier token instead of colon while parsing attribute', () => {
  const [parser, program] = parseProgram('< manifest fruit fruit=orange / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 18,
      lineNumber: 1,
      tokenLiteral: 'fruit',
      tokenType: {
        value: 'IDENTIFIER',
      },
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if equals token after colon token instead of identifier while parsing attribute', () => {
  const [parser, program] = parseProgram('< manifest fruit:=orange / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 18,
      lineNumber: 1,
      tokenLiteral: '=',
      tokenType: {
        value: '=',
      },
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if identifier token after equals while parsing attribute', () => {
  const [parser, program] = parseProgram('< manifest fruit= fruit=orange / >');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 19,
      lineNumber: 1,
      tokenLiteral: 'fruit',
      tokenType: {
        value: 'IDENTIFIER',
      },
    },
    errorType: 'UNEXPECTED_TOKEN',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if identifier token after equals while parsing attribute in xml prolog', () => {
  const [parser, program] = parseProgram('<? xml fruit= fruit=orange ?>');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 15,
      lineNumber: 1,
      tokenLiteral: 'fruit',
      tokenType: {
        value: 'IDENTIFIER',
      },
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
      tokenLiteral: 'EOF',
      tokenType: {
        value: 'EOF',
      },
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
      tokenLiteral: 'EOF',
      tokenType: {
        value: 'EOF',
      },
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
      tokenType: {
        value: '<',
      },
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
      tokenType: {
        value: '?',
      },
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
      tokenType: {
        value: 'IDENTIFIER',
      },
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
      tokenType: {
        value: '<',
      },
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
      tokenLiteral: 'EOF',
      tokenType: {
        value: 'EOF',
      },
    },
    errorType: 'UNEXPECTED_EOF',
  });
  expect(program.statements.length).toBe(0);
});

test('should return error if error while parsing children of xml tag', () => {
  const [parser, program] = parseProgram('< manifest > <child-tag /<');

  expect(parser.errors.length).toBe(1);
  expect(parser.errors[0].serialized()).toStrictEqual({
    culpritToken: {
      columnNumber: 26,
      lineNumber: 1,
      tokenLiteral: '<',
      tokenType: {
        value: '<',
      },
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
      tokenType: {
        value: '?',
      },
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
      tokenType: {
        value: 'IDENTIFIER',
      },
    },
    errorType: 'UNEXPECTED_CLOSING_TAG_LITERAL',
  });
  expect(program.statements.length).toBe(0);
});
