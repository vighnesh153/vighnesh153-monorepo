/**
 * @vitest-environment jsdom
 */
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Note } from "./Note.tsx";

test("Note should render title and children", () => {
  render(
    <Note type="info" title="Test Title">
      <div>Test Content</div>
    </Note>
  );
  expect(screen.getByText("Test Title")).toBeInTheDocument();
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});

test("Note should use default title if none provided", () => {
  render(
    <Note type="success">
      <div>Test Content</div>
    </Note>
  );
  expect(screen.getByText("Success")).toBeInTheDocument();
});
