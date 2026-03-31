/**
 * @vitest-environment jsdom
 */
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CanvasProjectCard } from "./CanvasProjectCard.tsx";

// Mock ImageWithCache as it's not the focus here
vi.mock("./ImageWithCache", () => ({
  ImageWithCache: (props: any) => <img data-testid="mock-img" src={props.src} alt={props.imageProps.alt} />
}));

test("CanvasProjectCard should render title and link", () => {
  render(
    <CanvasProjectCard
      title="My Project"
      link="https://example.com"
      imageLink="https://example.com/image.png"
    />
  );
  expect(screen.getByText("My Project")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
  expect(screen.getByTestId("mock-img")).toHaveAttribute("src", "https://example.com/image.png");
});
