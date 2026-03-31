/**
 * @vitest-environment jsdom
 */
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Spinner } from "./Spinner.tsx";

test("Spinner should render with role img", () => {
  render(<Spinner />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});

test("Spinner should pass additional props to svg element", () => {
  render(<Spinner data-testid="spinner-svg" />);
  expect(screen.getByTestId("spinner-svg")).toBeInTheDocument();
});
