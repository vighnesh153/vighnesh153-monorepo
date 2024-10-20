/* eslint-disable @typescript-eslint/no-use-before-define */
import { not } from '@vighnesh153/tools';
import { XmlElementAttribute } from '@vighnesh153/parser-xml';

export function sortAttributes(attributes: readonly XmlElementAttribute[]): XmlElementAttribute[] {
  const sortedAttributes: XmlElementAttribute[] = [];
  let clonedAttributes = [...attributes];

  const moveAttributesToResult = (intermediateAttrs: XmlElementAttribute[]): void => {
    if (intermediateAttrs.length === 0) {
      return;
    }
    sortedAttributes.push(...naiveSort(intermediateAttrs));
    clonedAttributes = clonedAttributes.filter((attr) => not(intermediateAttrs.includes(attr)));
  };

  // xmlns:android
  const xmlnsAndroidAttr = clonedAttributes.find(
    (attr) =>
      attr.namespaces.length === 2 &&
      attr.namespaces[0].tokenLiteral === 'xmlns' &&
      attr.namespaces[1].tokenLiteral === 'android'
  );
  if (xmlnsAndroidAttr) {
    moveAttributesToResult([xmlnsAndroidAttr]);
  }

  // xmlns:*
  moveAttributesToResult(
    clonedAttributes.filter((attr) => attr.namespaces.length > 0 && attr.namespaces[0].tokenLiteral === 'xmlns')
  );

  // android:id
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) =>
        attr.namespaces.length === 2 &&
        attr.namespaces[0].tokenLiteral === 'android' &&
        attr.namespaces[1].tokenLiteral === 'id'
    )
  );

  // android.*:id
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) =>
        attr.namespaces.length > 0 &&
        attr.namespaces[0].tokenLiteral === 'android' &&
        attr.namespaces.at(-1)?.tokenLiteral === 'id'
    )
  );

  // android:name
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) =>
        attr.namespaces.length === 2 &&
        attr.namespaces[0].tokenLiteral === 'android' &&
        attr.namespaces[1].tokenLiteral === 'name'
    )
  );

  // android.*:name
  moveAttributesToResult(
    clonedAttributes.filter(
      (attr) =>
        attr.namespaces.length > 0 &&
        attr.namespaces[0].tokenLiteral === 'android' &&
        attr.namespaces.at(-1)?.tokenLiteral === 'name'
    )
  );

  // name
  moveAttributesToResult(
    clonedAttributes.filter((attr) => attr.namespaces.length === 1 && attr.namespaces[0].tokenLiteral === 'name')
  );

  // style
  moveAttributesToResult(
    clonedAttributes.filter((attr) => attr.namespaces.length === 1 && attr.namespaces[0].tokenLiteral === 'style')
  );

  // no-namespace attributes
  moveAttributesToResult(clonedAttributes.filter((attr) => attr.namespaces.length === 1));

  // android ns attributes
  moveAttributesToResult(
    clonedAttributes.filter((attr) => attr.namespaces.length > 1 && attr.namespaces[0].tokenLiteral === 'android')
  );

  // remaining attributes
  moveAttributesToResult(clonedAttributes);

  return sortedAttributes;
}

function naiveSort(attributes: XmlElementAttribute[]): XmlElementAttribute[] {
  return attributes.toSorted((attr1, attr2) => {
    const combinedKey1 = attr1.namespaces.map((ns) => ns.tokenLiteral).join(':');
    const combinedKey2 = attr2.namespaces.map((ns) => ns.tokenLiteral).join(':');
    return combinedKey1.localeCompare(combinedKey2);
  });
}
