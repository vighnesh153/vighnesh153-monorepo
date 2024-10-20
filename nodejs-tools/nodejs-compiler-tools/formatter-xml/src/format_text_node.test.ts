import { expect, test } from "vitest";
import { XmlTagNode, XmlTextNode } from "@vighnesh153/parser-xml";
import { formatTextNode } from "./format_text_node.ts";
import { parseProgram } from "./test_utils.ts";

test("should format text node with 0 indentation level", () => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatTextNode({
      textNode: (program.statements[0] as XmlTagNode)
        .children[0] as XmlTextNode,
      indentation: 4,
      indentationLevel: 0,
    }),
  ).toMatchInlineSnapshot(`"Pikachu"`);
});

test("should format text node with 2 indentation level", () => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatTextNode({
      textNode: (program.statements[0] as XmlTagNode)
        .children[0] as XmlTextNode,
      indentation: 4,
      indentationLevel: 2,
    }),
  ).toMatchInlineSnapshot(`"        Pikachu"`);
});

test("should format text node with 2 indentation level and 3 indentation", () => {
  const [parser, program] = parseProgram(
    `< pokemon  >  Pikachu    < /  pokemon >`,
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatTextNode({
      textNode: (program.statements[0] as XmlTagNode)
        .children[0] as XmlTextNode,
      indentation: 3,
      indentationLevel: 2,
    }),
  ).toMatchInlineSnapshot(`"      Pikachu"`);
});
