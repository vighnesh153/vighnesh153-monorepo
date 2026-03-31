/**
 * @vitest-environment jsdom
 */
import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ImageWithCache } from "./ImageWithCache.tsx";
import * as cachingUtils from "@/utils/image_caching.ts";

vi.mock("@/utils/image_caching.ts", () => ({
  cacheImage: vi.fn(),
}));

test("ImageWithCache should render fallback if url is null", () => {
  render(
    <ImageWithCache
      src="src"
      cacheKey="key"
      fallback={<div data-testid="fallback">Fallback</div>}
    />
  );
  expect(screen.getByTestId("fallback")).toBeInTheDocument();
});

test("ImageWithCache should render image once cachedUrl is available", async () => {
  vi.mocked(cachingUtils.cacheImage).mockResolvedValue("cached-url");
  
  render(
    <ImageWithCache
      src="src"
      cacheKey="key"
      imageProps={{ "data-testid": "img" } as any}
    />
  );
  
  await waitFor(() => {
    expect(screen.getByTestId("img")).toHaveAttribute("src", "cached-url");
  });
});
