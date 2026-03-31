/**
 * @vitest-environment jsdom
 */
import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ListItem } from "./ListItem.tsx";

test("ListItem should render text", () => {
  render(<ListItem text="Hello World" onClick={() => {}} />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});

test("ListItem should call onClick when clicked", () => {
  const onClick = vi.fn();
  render(<ListItem text="Hello World" onClick={onClick} />);
  fireEvent.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalled();
});

test("ListItem should render leading content", () => {
  render(
    <ListItem
      text="Hello World"
      onClick={() => {}}
      leadingContent={<span data-testid="leading">Leading</span>}
    />
  );
  expect(screen.getAllByTestId("leading")).toHaveLength(2); // Since it's used twice in the original component
});
