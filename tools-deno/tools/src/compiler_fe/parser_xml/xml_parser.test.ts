import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import {
  Lexer,
  LexerInputReader,
  StringLexerInput,
} from "@/compiler_fe/lexer_core/mod.ts";
import { XmlTokenType } from "@/compiler_fe/lexer_xml/mod.ts";
import { XmlParser } from "./xml_parser.ts";
import type { XmlProgram } from "./ast.ts";

function parseProgram(input: string): [XmlParser, XmlProgram] {
  const stringInput = new StringLexerInput(input);
  const inputReader = new LexerInputReader(stringInput);
  const lexer = new Lexer<XmlTokenType>(inputReader);
  const parser = new XmlParser(lexer);

  return [parser, parser.parseProgram()];
}

Deno.test("XmlParser should parse empty xml input", () => {
  const [parser, program] = parseProgram("");

  assertEquals(parser.errors, []);
  assertEquals(program.statements, []);
});

Deno.test("XmlParser should parse prolog tag without attributes", async (t) => {
  const [parser, program] = parseProgram("< ? xml ? >");

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse prolog tag with attributes", async (t) => {
  const [parser, program] = parseProgram(
    '< ? xml version  =  "1.0" encoding ="UTF-8" ? >',
  );

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse empty self-closing tag", async (t) => {
  const [parser, program] = parseProgram("< manifest / >");

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse empty tag", async (t) => {
  const [parser, program] = parseProgram("< manifest > < /   manifest>");

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse tag with single simple attribute", async (t) => {
  const [parser, program] = parseProgram(
    '< manifest package="com.pokemon.pikachu" / >',
  );

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse tag with multiple simple attributes", async (t) => {
  const [parser, program] = parseProgram(
    '< manifest package= "com.pokemon.pikachu" attr2  =   "2.0" / >',
  );

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse tag with colon separated attributes", async (t) => {
  const [parser, program] = parseProgram(
    `<uses-feature      android:name   =    
    
    "android.hardware.touchscreen" 
    
    android:required      =
    "false" />`,
  );

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test(
  "XmlParser should be able to read tags with namespaces and classes",
  async (t) => {
    const [parser, program] = parseProgram(
      "< namespace1:namespace2.class1.class2:namespace3.class3.class4 > </ namespace1:namespace2.class1.class2:namespace3.class3.class4>",
    );

    assertEquals(parser.errors.length, 0);
    assertEquals(program.statements.length, 1);
    await assertSnapshot(t, program.toString(0));
  },
);

Deno.test("XmlParser should parse naked text node", async (t) => {
  const [parser, program] = parseProgram("pikachu");

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse tag with children", async (t) => {
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

    `,
  );

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 2);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should parse tag with text node children and attributes", async (t) => {
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

  assertEquals(parser.errors, []);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(t, program.toString(0));
});

Deno.test("XmlParser should return error if incorrect token position", () => {
  const [parser, program] = parseProgram("?");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 1,
      lineNumber: 1,
      tokenLiteral: "?",
      tokenType: XmlTokenType.QuestionMark,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if EOF while reading attribute", () => {
  const [parser, program] = parseProgram("< manifest fruit");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 16,
      lineNumber: 1,
      tokenLiteral: "Eof",
      tokenType: XmlTokenType.Eof,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if identifier token after identifier token instead of colon while parsing attribute", () => {
  const [parser, program] = parseProgram(
    '< manifest pokemon fruit="orange" / >',
  );

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 20,
      lineNumber: 1,
      tokenLiteral: "fruit",
      tokenType: XmlTokenType.Identifier,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if equals token after colon token instead of identifier while parsing attribute", () => {
  const [parser, program] = parseProgram('< manifest fruit:="orange" / >');

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 17,
      lineNumber: 1,
      tokenLiteral: ":",
      tokenType: XmlTokenType.Illegal,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if identifier token after equals while parsing attribute", () => {
  const [parser, program] = parseProgram("< manifest fruit= orange / >");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 19,
      lineNumber: 1,
      tokenLiteral: "orange",
      tokenType: XmlTokenType.Identifier,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if identifier token after equals while parsing attribute in xml prolog", () => {
  const [parser, program] = parseProgram("<? xml fruit= orange ?>");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 15,
      lineNumber: 1,
      tokenLiteral: "orange",
      tokenType: XmlTokenType.Identifier,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if EOF while parsing xml prolog", () => {
  const [parser, program] = parseProgram("<? xml  ");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 8,
      lineNumber: 1,
      tokenLiteral: "Eof",
      tokenType: XmlTokenType.Eof,
    },
    errorType: "UNEXPECTED_EOF",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if EOF while parsing xml tag", () => {
  const [parser, program] = parseProgram("< manifest  ");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: "Eof",
      tokenType: XmlTokenType.Eof,
    },
    errorType: "UNEXPECTED_EOF",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if incorrect token after closing question mark in xml prolog", () => {
  const [parser, program] = parseProgram("<? xml  ? <");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 11,
      lineNumber: 1,
      tokenLiteral: "<",
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error while parsing xml prolog if incorrect token after <?", () => {
  const [parser, program] = parseProgram("<? ?>");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 4,
      lineNumber: 1,
      tokenLiteral: "?",
      tokenType: XmlTokenType.QuestionMark,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error while parsing xml prolog if tag is not xml", () => {
  const [parser, program] = parseProgram("<? manifest  ?>");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 4,
      lineNumber: 1,
      tokenLiteral: "manifest",
      tokenType: XmlTokenType.Identifier,
    },
    errorType: "UNEXPECTED_PROLOG_TAG",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if incorrect token while parsing self closing xml tag", () => {
  const [parser, program] = parseProgram("< manifest  / <");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 15,
      lineNumber: 1,
      tokenLiteral: "<",
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if EOF while parsing children of xml tag", () => {
  const [parser, program] = parseProgram("< manifest >");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: "Eof",
      tokenType: XmlTokenType.Eof,
    },
    errorType: "UNEXPECTED_EOF",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if error while parsing children of xml tag", () => {
  const [parser, program] = parseProgram(
    "< manifest > <child-tag /< </manifest>",
  );

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 26,
      lineNumber: 1,
      tokenLiteral: "<",
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return error if incorrect token at end of tag", () => {
  const [parser, program] = parseProgram("< manifest > </ ?");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 17,
      lineNumber: 1,
      tokenLiteral: "?",
      tokenType: XmlTokenType.QuestionMark,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test(`XmlParser should return error if start and close tag don't match`, () => {
  const [parser, program] = parseProgram("< manifest > </ pokemon>");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 17,
      lineNumber: 1,
      tokenLiteral: "pokemon",
      tokenType: XmlTokenType.Identifier,
    },
    errorType: "UNEXPECTED_CLOSING_TAG_LITERAL",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return errors if equals without identifier", () => {
  const [parser, program] = parseProgram(
    '< manifest ="com.pokemon.pikachu" / >',
  );

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 12,
      lineNumber: 1,
      tokenLiteral: "=",
      tokenType: XmlTokenType.Equals,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test('XmlParser should return errors if "<" instead of ">" in closing tag literal', () => {
  const [parser, program] = parseProgram("< tag > </ tag <");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 16,
      lineNumber: 1,
      tokenLiteral: "<",
      tokenType: XmlTokenType.LeftAngleBracket,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test("XmlParser should return errors if nameless tag", () => {
  const [parser, program] = parseProgram("< >");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 3,
      lineNumber: 1,
      tokenLiteral: ">",
      tokenType: XmlTokenType.RightAngleBracket,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test('XmlParser should return error when unexpected token after ":" in tag name', () => {
  const [parser, program] = parseProgram("< ns1:ns2:  /> ");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 10,
      lineNumber: 1,
      tokenLiteral: ":",
      tokenType: XmlTokenType.Illegal,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test(`XmlParser should return error if start and end tag names don't match`, () => {
  const [parser, program] = parseProgram("< ns1:ns2  > </ ns3:ns4> ");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 17,
      lineNumber: 1,
      tokenLiteral: "ns3:ns4",
      tokenType: XmlTokenType.Identifier,
    },
    errorType: "UNEXPECTED_CLOSING_TAG_LITERAL",
  });
  assertEquals(program.statements.length, 0);
});

Deno.test('XmlParser should return error when unexpected token after ":" in in closing tag name', () => {
  const [parser, program] = parseProgram("< ns1:ns2  > </ ns1:ns2: >");

  assertEquals(parser.errors.length, 1);
  assertEquals(parser.errors[0].serialized(), {
    culpritToken: {
      columnNumber: 24,
      lineNumber: 1,
      tokenLiteral: ":",
      tokenType: XmlTokenType.Illegal,
    },
    errorType: "UNEXPECTED_TOKEN",
  });
  assertEquals(program.statements.length, 0);
});
