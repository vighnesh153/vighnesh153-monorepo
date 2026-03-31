/**
 * @vitest-environment jsdom
 */
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Avatar } from "./Avatar.tsx";

test("Avatar should render user initials", () => {
  render(<Avatar imageLink="https://example.com/avatar.png" userInitials="VR" />);
  expect(screen.getByText("VR")).toBeInTheDocument();
});

test("Avatar should render user image", () => {
  render(<Avatar imageLink="https://example.com/avatar.png" userInitials="VR" />);
  const img = screen.getByRole("img", { name: /logged in user/i });
  expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
});
