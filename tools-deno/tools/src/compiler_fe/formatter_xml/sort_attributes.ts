import { not } from "@/utils/mod.ts";
import type { XmlElementAttribute } from "@/compiler_fe/parser_xml/mod.ts";

export function sortAttributes(
  attributes: readonly XmlElementAttribute[],
): XmlElementAttribute[] {
  const sortedAttributes: XmlElementAttribute[] = [];
  let clonedAttributes = [...attributes];

  const moveAttributesToResult = (
    intermediateAttrs: XmlElementAttribute[],
  ): void => {
    if (intermediateAttrs.length === 0) {
      return;
    }
    sortedAttributes.push(...naiveSort(intermediateAttrs));
    clonedAttributes = clonedAttributes.filter((attr) =>
      not(intermediateAttrs.includes(attr))
    );
  };

  // xmlns:android
  const xmlnsAndroidAttr = clonedAttributes.find(
    (attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 2 &&
        namespaces[0] === "xmlns" &&
        namespaces[1] === "android";
    },
  );
  if (xmlnsAndroidAttr) {
    moveAttributesToResult([xmlnsAndroidAttr]);
  }

  // xmlns:*
  moveAttributesToResult(
    clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length > 0 && namespaces[0] === "xmlns";
    }),
  );

  // android:id
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) => {
        const namespaces = parseNamespaces(attr);
        return namespaces.length === 2 &&
          namespaces[0] === "android" &&
          namespaces[1] === "id";
      },
    ),
  );

  // android.*:id
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) => {
        const namespaces = parseNamespaces(attr);
        return namespaces.length > 0 &&
          namespaces[0] === "android" &&
          namespaces.at(-1) === "id";
      },
    ),
  );

  // android:name
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) => {
        const namespaces = parseNamespaces(attr);
        return namespaces.length === 2 &&
          namespaces[0] === "android" &&
          namespaces[1] === "name";
      },
    ),
  );

  // android.*:name
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) => {
        const namespaces = parseNamespaces(attr);
        return namespaces.length > 0 &&
          namespaces[0] === "android" &&
          namespaces.at(-1) === "name";
      },
    ),
  );

  // name
  moveAttributesToResult(
    clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 1 && namespaces[0] === "name";
    }),
  );

  // style
  moveAttributesToResult(
    clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length === 1 &&
        namespaces[0] === "style";
    }),
  );

  // no-namespace attributes
  moveAttributesToResult(
    clonedAttributes.filter((attr) => parseNamespaces(attr).length === 1),
  );

  // android ns attributes
  moveAttributesToResult(
    clonedAttributes.filter((attr) => {
      const namespaces = parseNamespaces(attr);
      return namespaces.length > 1 &&
        namespaces[0] === "android";
    }),
  );

  // remaining attributes
  moveAttributesToResult(clonedAttributes);

  return sortedAttributes;
}

function naiveSort(attributes: XmlElementAttribute[]): XmlElementAttribute[] {
  return attributes.toSorted((attr1, attr2) =>
    attr1.attributeName.tokenLiteral.localeCompare(
      attr2.attributeName.tokenLiteral,
    )
  );
}

function parseNamespaces(attr: XmlElementAttribute): string[] {
  return attr.attributeName.tokenLiteral.split(":");
}
