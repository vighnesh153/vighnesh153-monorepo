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
      sortAttributes: true,
    })
  ).toMatchInlineSnapshot(`"<manifest />"`);
});

test('should format self-closing xml tag node with attributes', () => {
  const [parser, program] = parseProgram(
    `<manifest   simpleAttribute = "some random value" deeply :  nested:attribute = "20" />`
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    })
  ).toMatchInlineSnapshot(`
    "<manifest
        simpleAttribute="some random value"
        deeply:nested:attribute="20" />"
  `);
});

test('should format non self-closing xml tag node with attributes but no children', () => {
  const [parser, program] = parseProgram(
    `<manifest   simpleAttribute = "some random value" deeply :  nested:attribute = "20" >
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
      sortAttributes: true,
    })
  ).toMatchInlineSnapshot(`
    "<manifest
        simpleAttribute="some random value"
        deeply:nested:attribute="20" />"
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
      sortAttributes: true,
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

test('should sort all attributes based on android rules', () => {
  const [parser, program] = parseProgram(
    `<manifest  
        qlaAttr="prop18"
        name="prop14"
        blaAttr="prop16"
        xmlns:android="prop1"
        android:bla:id="prop5"
        android:zza:name="prop12"
        android:plz:name="prop11"
        android:poki2:id="prop8"
        android:raster="prop22"
        xmlns:app="prop2"
        android:pae="prop21"
        zools:duckie="prop27"
        plaAttr="prop17"
        tools:hungry="prop26"
        style="prop15"
        android:zzb:name="prop13"
        android:id="prop4"
        android:plu:name="prop10"
        zlaAttr="prop19"
        app:bla="prop24"
        xmlns:tools="prop3"
        android:blb:id="prop6"
        android:name="prop9"
        android:layout="prop20"
        app:pla="prop25"
        android:poki1:id="prop7"
        android:temper="prop23"
     />
    `
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    })
  ).toMatchInlineSnapshot(`
    "<manifest
        xmlns:android="prop1"
        xmlns:app="prop2"
        xmlns:tools="prop3"
        android:id="prop4"
        android:bla:id="prop5"
        android:blb:id="prop6"
        android:poki1:id="prop7"
        android:poki2:id="prop8"
        android:name="prop9"
        android:plu:name="prop10"
        android:plz:name="prop11"
        android:zza:name="prop12"
        android:zzb:name="prop13"
        name="prop14"
        style="prop15"
        blaAttr="prop16"
        plaAttr="prop17"
        qlaAttr="prop18"
        zlaAttr="prop19"
        android:layout="prop20"
        android:pae="prop21"
        android:raster="prop22"
        android:temper="prop23"
        app:bla="prop24"
        app:pla="prop25"
        tools:hungry="prop26"
        zools:duckie="prop27" />"
  `);
});

test('should format xml tag node without sorting if sortAttribute is false', () => {
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
      sortAttributes: false,
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
