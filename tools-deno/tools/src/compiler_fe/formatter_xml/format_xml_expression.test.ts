import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import type {
  XmlCommentNode,
  XmlPrologNode,
  XmlTagNode,
} from "@/compiler_fe/parser_xml/mod.ts";
import { formatXmlExpression } from "./format_xml_expression.ts";
import { parseProgram } from "./test_utils.ts";

Deno.test("formatXmlExpression should format xml prolog node", async (t) => {
  const [parser, program] = parseProgram(
    `<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlExpression({
      expression: program.statements[0] as XmlPrologNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("formatXmlExpression should format xml tag node", async (t) => {
  const [parser, program] = parseProgram(
    `<manifest   simpleProperty = "some random value" deeply :  nested:property = "20" >
  </ manifest>
    `,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlExpression({
      expression: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("formatXmlExpression should format comment node", async (t) => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlExpression({
      expression: program.statements[0] as XmlCommentNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("formatXmlExpression should format text node", async (t) => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlExpression({
      expression: (program.statements[0] as XmlTagNode).children[0],
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});
