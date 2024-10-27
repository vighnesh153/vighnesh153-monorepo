import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import type { XmlTagNode, XmlTextNode } from "@/compiler_fe/parser_xml/mod.ts";
import { formatTextNode } from "./format_text_node.ts";
import { parseProgram } from "./test_utils.ts";

Deno.test("formatTextNode should format text node with 0 indentation level", async (t) => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatTextNode({
      textNode: (program.statements[0] as XmlTagNode)
        .children[0] as XmlTextNode,
      indentation: 4,
      indentationLevel: 0,
    }),
  );
});

Deno.test("formatTextNode should format text node with 2 indentation level", async (t) => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatTextNode({
      textNode: (program.statements[0] as XmlTagNode)
        .children[0] as XmlTextNode,
      indentation: 4,
      indentationLevel: 2,
    }),
  );
});

Deno.test("formatTextNode should format text node with 2 indentation level and 3 indentation", async (t) => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatTextNode({
      textNode: (program.statements[0] as XmlTagNode)
        .children[0] as XmlTextNode,
      indentation: 3,
      indentationLevel: 2,
    }),
  );
});
