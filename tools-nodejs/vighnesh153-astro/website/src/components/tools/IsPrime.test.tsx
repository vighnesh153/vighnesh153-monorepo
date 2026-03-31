/**
 * @vitest-environment jsdom
 */
import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IsPrime } from "./IsPrime.tsx";

test("IsPrime should identify prime numbers correctly", async () => {
  render(<IsPrime />);
  const input = screen.getByRole("spinbutton");
  const button = screen.getByRole("button", { name: /check/i });

  fireEvent.change(input, { target: { value: "7" } });
  fireEvent.click(button);

  expect(screen.getByText(/7 is a prime number/i)).toBeInTheDocument();
});

test("IsPrime should identify non-prime numbers correctly", async () => {
  render(<IsPrime />);
  const input = screen.getByRole("spinbutton");
  const button = screen.getByRole("button", { name: /check/i });

  fireEvent.change(input, { target: { value: "8" } });
  fireEvent.click(button);

  expect(screen.getByText(/8 is not a prime number/i)).toBeInTheDocument();
});
