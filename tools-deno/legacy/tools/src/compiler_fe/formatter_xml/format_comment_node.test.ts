import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import type { XmlCommentNode } from "@/compiler_fe/parser_xml/mod.ts";
import { formatCommentNode } from "./format_comment_node.ts";
import { parseProgram } from "./test_utils.ts";

Deno.test("formatCommentNode should format comment node with 0 indentation level", async (t) => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatCommentNode({
      commentNode: program.statements[0] as XmlCommentNode,
      indentation: 4,
      indentationLevel: 0,
    }),
  );
});

Deno.test("formatCommentNode should format comment node with 2 indentation level", async (t) => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatCommentNode({
      commentNode: program.statements[0] as XmlCommentNode,
      indentation: 4,
      indentationLevel: 2,
    }),
  );
});

Deno.test("formatCommentNode should format comment node with 2 indentation level and 3 indentation", async (t) => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatCommentNode({
      commentNode: program.statements[0] as XmlCommentNode,
      indentation: 3,
      indentationLevel: 2,
    }),
  );
});
