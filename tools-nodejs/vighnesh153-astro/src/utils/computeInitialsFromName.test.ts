import { expect, test } from "vitest";

import { computeInitialsFromName } from "./computeInitialsFromName.ts";

test("empty name", () => {
  expect(computeInitialsFromName("")).toBe("");
});

test("only first name with single character", () => {
  expect(computeInitialsFromName("P")).toBe("P");
});

test("only first name with multiple characters", () => {
  expect(computeInitialsFromName("pikachu")).toBe("PI");
});

test("name with spaces at start", () => {
  expect(computeInitialsFromName("   Pikachu")).toBe("PI");
});

test("name with trailing spaces", () => {
  expect(computeInitialsFromName("Pikachu   ")).toBe("PI");
});

test("first and last name", () => {
  expect(computeInitialsFromName("ash ketchum")).toBe("AK");
});

test("first, middle and last name", () => {
  expect(computeInitialsFromName("ash Delia Ketchum")).toBe("AK");
});
