import { test, expect } from 'vitest';
import { XmlPrologNode } from '@vighnesh153/parser-xml';
import { formatXmlPrologNode } from './format_xml_prolog_node';
import { parseProgram } from './test_utils';

test('should format xml prolog node with 0 indentation level', () => {
  const [parser, program] = parseProgram(`<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`);

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlPrologNode({
      xmlPrologNode: program.statements[0] as XmlPrologNode,
      indentation: 4,
      indentationLevel: 0,
    })
  ).toMatchInlineSnapshot(`"<?xml encoding="utf-8" version="2.0"?>"`);
});

test('should format xml prolog node with 2 indentation level', () => {
  const [parser, program] = parseProgram(`<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`);

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlPrologNode({
      xmlPrologNode: program.statements[0] as XmlPrologNode,
      indentation: 4,
      indentationLevel: 2,
    })
  ).toMatchInlineSnapshot(`"        <?xml encoding="utf-8" version="2.0"?>"`);
});

test('should format xml prolog node with 2 indentation level and 3 indentation', () => {
  const [parser, program] = parseProgram(`<? xml  encoding =   "utf-8"  version =  "2.0"   ?>`);

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlPrologNode({
      xmlPrologNode: program.statements[0] as XmlPrologNode,
      indentation: 3,
      indentationLevel: 2,
    })
  ).toMatchInlineSnapshot(`"      <?xml encoding="utf-8" version="2.0"?>"`);
});
