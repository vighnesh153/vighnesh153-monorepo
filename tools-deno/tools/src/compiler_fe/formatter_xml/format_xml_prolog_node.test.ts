import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import type { XmlPrologNode } from "@/compiler_fe/parser_xml/mod.ts";
import { formatXmlPrologNode } from "./format_xml_prolog_node.ts";
import { parseProgram } from "./test_utils.ts";

Deno.test("formatXmlPrologNode should format xml prolog node with 0 indentation level", async (t) => {
  const [parser, program] = parseProgram(
    `<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlPrologNode({
      xmlPrologNode: program.statements[0] as XmlPrologNode,
      indentation: 4,
      indentationLevel: 0,
    }),
  );
});

Deno.test("formatXmlPrologNode should format xml prolog node with 2 indentation level", async (t) => {
  const [parser, program] = parseProgram(
    `<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlPrologNode({
      xmlPrologNode: program.statements[0] as XmlPrologNode,
      indentation: 4,
      indentationLevel: 2,
    }),
  );
});

Deno.test("formatXmlPrologNode should format xml prolog node with 2 indentation level and 3 indentation", async (t) => {
  const [parser, program] = parseProgram(
    `<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlPrologNode({
      xmlPrologNode: program.statements[0] as XmlPrologNode,
      indentation: 3,
      indentationLevel: 2,
    }),
  );
});
