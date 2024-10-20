import { expect, test } from "vitest";
import {
  XmlCommentNode,
  XmlPrologNode,
  XmlTagNode,
} from "@vighnesh153/parser-xml";
import { formatXmlExpression } from "./format_xml_expression.ts";
import { parseProgram } from "./test_utils.ts";

test("should format xml prolog node", () => {
  const [parser, program] = parseProgram(
    `<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlExpression({
      expression: program.statements[0] as XmlPrologNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  ).toMatchInlineSnapshot(`"<?xml encoding="utf-8" version="2.0"?>"`);
});

test("should format xml tag node", () => {
  const [parser, program] = parseProgram(
    `<manifest   simpleProperty = "some random value" deeply :  nested:property = "20" >
  </ manifest>
    `,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlExpression({
      expression: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  ).toMatchInlineSnapshot(`
    "<manifest
        simpleProperty="some random value"
        deeply:nested:property="20" />"
  `);
});

test("should format comment node", () => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlExpression({
      expression: program.statements[0] as XmlCommentNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  ).toMatchInlineSnapshot(
    `"<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->"`,
  );
});

test("should format text node", () => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlExpression({
      expression: (program.statements[0] as XmlTagNode).children[0],
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  ).toMatchInlineSnapshot(`"Pikachu"`);
});
