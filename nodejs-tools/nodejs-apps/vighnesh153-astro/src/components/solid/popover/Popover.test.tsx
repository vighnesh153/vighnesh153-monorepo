/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { afterEach, assert, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { Popover } from "./Popover.tsx";
import type { PopoverPlacement, PopoverToggle } from "./externalTypes.ts";

function constructBoundingClientRect(rect: Partial<DOMRect>): DOMRect {
  return {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: vi.fn(),
    ...rect,
  };
}

const user = userEvent.setup();

beforeEach(() => {
  cleanup();
  document.dir = "ltr";
});

afterEach(() => {
  document.dir = "ltr";
});

test("popover should have a tooltip role", async () => {
  render(() => (
    <Popover
      popoverContent={<div data-testid="popover-content">Popover content</div>}
      controlElement={(_, toggle) => (
        <button onClick={() => toggle()}>Toggle Popover</button>
      )}
    />
  ));

  const popoverToggleButton = screen.getByRole("button", {
    name: "Toggle Popover",
  });
  await user.click(popoverToggleButton);

  expect(screen.queryByRole("tooltip")).toBeVisible();
});

test("should show and hide the popover content based on open signal", async () => {
  render(() => (
    <Popover
      popoverContent={<div data-testid="popover-content">Popover content</div>}
      controlElement={(_, toggle) => (
        <button onClick={() => toggle()}>Toggle Popover</button>
      )}
    />
  ));

  const popoverToggleButton = screen.getByRole("button", {
    name: "Toggle Popover",
  });
  expect(popoverToggleButton).toBeVisible();

  expect(screen.queryByTestId("popover-content")).toBeNull();

  await user.click(popoverToggleButton);

  expect(screen.queryByTestId("popover-content")).toBeVisible();
});

test("should hide popover if clicked outside", async () => {
  render(() => {
    return (
      <div>
        <div style={{ height: "500px" }}>
          <Popover
            popoverContent={
              <div data-testid="popover-content">Popover content</div>
            }
            controlElement={(_, toggle) => (
              <button onClick={() => toggle()}>Toggle Popover</button>
            )}
          />
        </div>
        <div>
          <p>Some outside text</p>
        </div>
      </div>
    );
  });

  const popoverToggleButton = screen.getByRole("button", {
    name: "Toggle Popover",
  });
  expect(popoverToggleButton).toBeVisible();

  expect(screen.queryByTestId("popover-content")).toBeNull();

  await user.click(popoverToggleButton);

  expect(screen.queryByTestId("popover-content")).toBeVisible();

  const someOutsideText = screen.getByText("Some outside text");
  expect(someOutsideText).toBeVisible();

  await user.click(someOutsideText);

  expect(screen.queryByTestId("popover-content")).toBeNull();
});

test("should not hide popover if clicked inside", async () => {
  render(() => (
    <div>
      <div style={{ height: "500px" }}>
        <Popover
          popoverContent={
            <div data-testid="popover-content">
              <p>Popover content</p>
              <p>Some inside text</p>
            </div>
          }
          controlElement={(_, toggle) => (
            <button onClick={() => toggle()}>Toggle Popover</button>
          )}
        />
      </div>
      <div>
        <p>Some outside text</p>
      </div>
    </div>
  ));

  const popoverToggleButton = screen.getByRole("button", {
    name: "Toggle Popover",
  });
  expect(popoverToggleButton).toBeVisible();

  expect(screen.queryByTestId("popover-content")).toBeNull();

  await user.click(popoverToggleButton);

  expect(screen.queryByTestId("popover-content")).toBeVisible();

  const someInsideText = screen.getByText("Some inside text");
  expect(someInsideText).toBeVisible();

  await user.click(someInsideText);

  expect(screen.queryByTestId("popover-content")).toBeVisible();
});

test("popover default placement ltr bottom center", async () => {
  await popoverPlacementTest({
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "50px",
    },
  });
});

test("popover default placement rtl bottom center", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "50px",
    },
  });
});

test("popover ltr bottom-start placement", async () => {
  await popoverPlacementTest({
    placement: "bottom-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "0px",
    },
  });
});

test("popover ltr bottom-center placement", async () => {
  await popoverPlacementTest({
    placement: "bottom-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "50px",
    },
  });
});

test("popover ltr bottom-end placement", async () => {
  await popoverPlacementTest({
    placement: "bottom-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "100px",
    },
  });
});

test("popover ltr right-start placement", async () => {
  await popoverPlacementTest({
    placement: "right-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "0px",
      left: "200px",
    },
  });
});

test("popover ltr right-center placement", async () => {
  await popoverPlacementTest({
    placement: "right-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "50px",
      left: "200px",
    },
  });
});

test("popover ltr right-end placement", async () => {
  await popoverPlacementTest({
    placement: "right-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "100px",
      left: "200px",
    },
  });
});

test("popover ltr top-start placement", async () => {
  await popoverPlacementTest({
    placement: "top-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "-100px",
      left: "0px",
    },
  });
});

test("popover ltr top-center placement", async () => {
  await popoverPlacementTest({
    placement: "top-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "-100px",
      left: "50px",
    },
  });
});

test("popover ltr top-end placement", async () => {
  await popoverPlacementTest({
    placement: "top-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "-100px",
      left: "100px",
    },
  });
});

test("popover ltr left-start placement", async () => {
  await popoverPlacementTest({
    placement: "left-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "0px",
      left: "-100px",
    },
  });
});

test("popover ltr left-center placement", async () => {
  await popoverPlacementTest({
    placement: "left-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "50px",
      left: "-100px",
    },
  });
});

test("popover ltr left-end placement", async () => {
  await popoverPlacementTest({
    placement: "left-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "100px",
      left: "-100px",
    },
  });
});

test("popover rtl left-start placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "left-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "0px",
      left: "-100px",
    },
  });
});

test("popover rtl left-center placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "left-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "50px",
      left: "-100px",
    },
  });
});

test("popover rtl left-end placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "left-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "100px",
      left: "-100px",
    },
  });
});

test("popover rtl right-start placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "right-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "0px",
      left: "200px",
    },
  });
});

test("popover rtl right-center placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "right-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "50px",
      left: "200px",
    },
  });
});

test("popover rtl right-end placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "right-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "100px",
      left: "200px",
    },
  });
});

test("popover rtl top-start placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "top-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "-100px",
      left: "100px",
    },
  });
});

test("popover rtl top-center placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "top-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "-100px",
      left: "50px",
    },
  });
});

test("popover rtl top-end placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "top-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "-100px",
      left: "0px",
    },
  });
});

test("popover rtl bottom-start placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "bottom-start",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "100px",
    },
  });
});

test("popover rtl bottom-center placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "bottom-center",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "50px",
    },
  });
});

test("popover rtl bottom-end placement", async () => {
  await popoverPlacementTest({
    layoutDirection: "rtl",
    placement: "bottom-end",
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: "200px",
      left: "0px",
    },
  });
});

// TODO: triangle bump tests (unable to test :before pseudo element styles.
// will have to wait for image snapshot API in vitest 2.x)

async function popoverPlacementTest(props: {
  placement?: PopoverPlacement;
  layoutDirection?: "ltr" | "rtl";
  popoverDimensions?: { width: number; height: number };
  toggleButtonDimensions?: Partial<DOMRect>;
  expectedStyles: Record<string, unknown>;
}) {
  if (props.layoutDirection) {
    document.dir = "rtl";
  }

  render(() => {
    const controlElement = (_: boolean, toggle: PopoverToggle) => {
      const button = (
        <button
          style={{ width: "200px", height: "100px" }}
          onClick={() => toggle()}
        >
          Toggle Popover
        </button>
      );
      // @ts-ignore
      button.getBoundingClientRect = vi.fn(() =>
        constructBoundingClientRect(props.toggleButtonDimensions)
      );
      return button;
    };
    return (
      <Popover
        {...{ placement: props.placement }}
        popoverContent={
          <div
            style={{ width: "100px", "aspect-ratio": 1 }}
            data-testid="popover-content"
          >
            Popover content
          </div>
        }
        controlElement={controlElement}
      />
    );
  });

  const popoverContentRoot = screen.queryByTestId("popover-content-root");
  const popoverToggleButton = screen.getByRole("button", {
    name: "Toggle Popover",
  });

  assert(popoverContentRoot);
  assert(popoverToggleButton);

  // @ts-ignore
  popoverContentRoot.getBoundingClientRect = vi.fn(() =>
    constructBoundingClientRect(props.popoverDimensions)
  );

  // open popover
  await user.click(popoverToggleButton);

  expect(popoverContentRoot).toHaveStyle(props.expectedStyles);
}
