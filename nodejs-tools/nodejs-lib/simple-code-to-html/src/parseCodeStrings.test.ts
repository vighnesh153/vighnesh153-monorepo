import { parseCodeStrings } from "./parseCodeStrings.ts";

const javascriptOptions = {
  escapeCharacters: ["\\"],
  acceptableStringChars: [`'`, '"', "`"],
};

test("no strings in code", () => {
  const result = parseCodeStrings(`const a = 123;`, javascriptOptions);

  expect(result).toStrictEqual([{ isString: false, value: `const a = 123;` }]);
});

it("split strings simple", () => {
  const result = parseCodeStrings(
    ` 'pikachu is best'  "charizard is also best"      \`lucario is also a beast\``,
    javascriptOptions,
  );

  expect(result).toStrictEqual([
    { isString: false, value: " " },
    { isString: true, value: `'pikachu is best'` },
    { isString: false, value: `  ` },
    { isString: true, value: `"charizard is also best"` },
    { isString: false, value: `      ` },
    { isString: true, value: "`lucario is also a beast`" },
  ]);
});

test("mixing of quotes in strings", () => {
  const result = parseCodeStrings(
    ` '"pikachu" is best'  "'charizard' is also best"      \`'lucario' is also a "beast"\``,
    javascriptOptions,
  );

  expect(result).toStrictEqual([
    { isString: false, value: " " },
    { isString: true, value: `'"pikachu" is best'` },
    { isString: false, value: `  ` },
    { isString: true, value: `"'charizard' is also best"` },
    { isString: false, value: `      ` },
    { isString: true, value: "`'lucario' is also a \"beast\"`" },
  ]);
});
