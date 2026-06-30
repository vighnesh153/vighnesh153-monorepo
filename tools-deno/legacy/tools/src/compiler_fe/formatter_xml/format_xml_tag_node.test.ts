import { assertEquals } from "@std/assert";
import { assertSnapshot } from "@std/testing/snapshot";
import type { XmlTagNode } from "@/compiler_fe/parser_xml/mod.ts";
import { formatXmlTagNode } from "./format_xml_tag_node.ts";
import { parseProgram } from "./test_utils.ts";

Deno.test("should format empty, self-closing xml tag node", async (t) => {
  const [parser, program] = parseProgram(`<manifest />`);

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("should format self-closing xml tag node with attributes", async (t) => {
  const [parser, program] = parseProgram(
    `<manifest   simpleAttribute = "some random value" deeply:nested:attribute = "20" />`,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("should format non self-closing xml tag node with attributes but no children", async (t) => {
  const [parser, program] = parseProgram(
    `<manifest   simpleAttribute = "some random value" deeply:nested:attribute = "20" >
  </ manifest>
    `,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("should format xml tag node with children", async (t) => {
  const [parser, program] = parseProgram(
    `<manifest    >
     < childTag  special:forces:commando = "Pikachu"  pokemon= "Hurray" />
      < childTag2    pokemon= "Greninja">
          <  childTag3  Infernape = "lol" >  </ childTag3>
       </ childTag2>
  </ manifest>
    `,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test("should sort all attributes based on android rules", async (t) => {
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
    `,
  );

  assertEquals(parser.errors.length, 0);
  assertEquals(program.statements.length, 1);
  await assertSnapshot(
    t,
    formatXmlTagNode({
      xmlTagNode: program.statements[0] as XmlTagNode,
      indentation: 4,
      indentationLevel: 0,
      sortAttributes: true,
    }),
  );
});

Deno.test(
  "should format xml tag node without sorting if sortAttribute is false",
  async (t) => {
    const [parser, program] = parseProgram(
      `<manifest    >
     < childTag  special:forces:commando = "Pikachu"  pokemon= "Hurray" />
      < childTag2    pokemon= "Greninja">
          <  childTag3  Infernape = "lol" >  </ childTag3>
       </ childTag2>
  </ manifest>
    `,
    );

    assertEquals(parser.errors.length, 0);
    assertEquals(program.statements.length, 1);
    await assertSnapshot(
      t,
      formatXmlTagNode({
        xmlTagNode: program.statements[0] as XmlTagNode,
        indentation: 4,
        indentationLevel: 0,
        sortAttributes: false,
      }),
    );
  },
);
