import { test, expect } from 'vitest';
import { XmlTagNode } from '@vighnesh153/parser-xml';
import { formatXmlTagNode } from './format_xml_tag_node';
import { parseProgram } from './test_utils';

test('should format empty, self-closing xml tag node', () => {
  const [parser, program] = parseProgram(`<manifest />`);

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortProperties: true,
    })
  ).toMatchInlineSnapshot(`"<manifest />"`);
});

test('should format self-closing xml tag node with properties', () => {
  const [parser, program] = parseProgram(
    `<manifest   simpleProperty = "some random value" deeply :  nested:property = "20" />`
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortProperties: true,
    })
  ).toMatchInlineSnapshot(`
    "<manifest
        deeply:nested:property="20"
        simpleProperty="some random value" />"
  `);
});

test('should format non self-closing xml tag node with properties but no children', () => {
  const [parser, program] = parseProgram(
    `<manifest   simpleProperty = "some random value" deeply :  nested:property = "20" >
  </ manifest>
    `
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortProperties: true,
    })
  ).toMatchInlineSnapshot(`
    "<manifest
        deeply:nested:property="20"
        simpleProperty="some random value" />"
  `);
});

test('should format xml tag node with children', () => {
  const [parser, program] = parseProgram(
    `<manifest    >
     < childTag  special: forces : commando = "Pikachu"  pokemon= "Hurray" />
      < childTag2    pokemon= "Greninja">
          <  childTag3  Infernape = "lol" >  </ childTag3>
       </ childTag2>
  </ manifest>
    `
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortProperties: true,
    })
  ).toMatchInlineSnapshot(`
    "<manifest>
        <childTag
            pokemon="Hurray"
            special:forces:commando="Pikachu" />
        <childTag2 pokemon="Greninja">
            <childTag3 Infernape="lol" />
        </childTag2>
    </manifest>"
  `);
});

test('should format xml tag node without sorting if sortProperties is false', () => {
  const [parser, program] = parseProgram(
    `<manifest    >
     < childTag  special: forces : commando = "Pikachu"  pokemon= "Hurray" />
      < childTag2    pokemon= "Greninja">
          <  childTag3  Infernape = "lol" >  </ childTag3>
       </ childTag2>
  </ manifest>
    `
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortProperties: false,
    })
  ).toMatchInlineSnapshot(`
    "<manifest>
        <childTag
            special:forces:commando="Pikachu"
            pokemon="Hurray" />
        <childTag2 pokemon="Greninja">
            <childTag3 Infernape="lol" />
        </childTag2>
    </manifest>"
  `);
});
