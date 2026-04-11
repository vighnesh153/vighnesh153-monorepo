import { expect } from "@std/expect";
import { PikaButton } from "@vighnesh153/react-material3-expressive";

// Needs to come before `@testing-library/react`.
import "./setupTest.ts";
import { cleanup, render, screen } from "@testing-library/react";

Deno.test.afterEach(cleanup);

Deno.test("renders button", () => {
  render(<PikaButton />);

  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Pikachu say hi!");
});
