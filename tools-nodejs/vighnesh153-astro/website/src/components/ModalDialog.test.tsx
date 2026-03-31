/**
 * @vitest-environment jsdom
 */
import { expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ModalDialog } from "./ModalDialog.tsx";

beforeEach(() => {
  // Polyfill HTMLDialogElement.prototype.showModal and close if they are missing
  if (typeof HTMLDialogElement.prototype.showModal !== "function") {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    });
  }
  if (typeof HTMLDialogElement.prototype.close !== "function") {
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    });
  }
});

test("ModalDialog should render content when open", () => {
  render(
    <ModalDialog open={true} close={() => {}}>
      <div data-testid="modal-content">Modal Content</div>
    </ModalDialog>
  );
  expect(screen.getByTestId("modal-content")).toBeInTheDocument();
});

test("ModalDialog should not render content when closed", () => {
  // When closed, it should still be in the DOM but not visible (due to dialog behavior)
  // But wait, the component always renders the <dialog> in a Portal.
  render(
    <ModalDialog open={false} close={() => {}}>
      <div data-testid="modal-content">Modal Content</div>
    </ModalDialog>
  );
  const dialog = screen.getByRole("dialog", { hidden: true });
  expect(dialog).not.toHaveAttribute("open");
});
