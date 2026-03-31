/**
 * @vitest-environment jsdom
 */
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Snackbar } from "./Snackbar.tsx";

test("Snackbar should render message", () => {
  render(
    <Snackbar
      id="1"
      type="success"
      message="Success Message"
      dismiss={vi.fn()}
      autoDismissible={false}
      manualDismissible={false}
    />
  );
  expect(screen.getByText("Success Message")).toBeInTheDocument();
});

test("Snackbar should render dismiss button if manualDismissible", () => {
  const dismiss = vi.fn();
  render(
    <Snackbar
      id="1"
      type="info"
      message="Info Message"
      dismiss={dismiss}
      autoDismissible={false}
      manualDismissible={true}
    />
  );
  const button = screen.getByRole("button");
  button.click();
  expect(dismiss).toHaveBeenCalled();
});
