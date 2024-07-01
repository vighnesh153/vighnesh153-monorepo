/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, expect, beforeEach, assert, vi } from 'vitest';
import { render, screen, cleanup } from '@solidjs/testing-library';
import { userEvent } from '@testing-library/user-event';
import { Popover } from './Popover';
import { createSignal } from 'solid-js';
import type { PopoverPlacement } from './externalTypes';

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
});

test('should show and hide the popover content based on open signal', async () => {
  render(() => {
    const [open, setOpen] = createSignal(false);
    return (
      <Popover
        open={open()}
        close={() => null}
        popoverContent={<div data-testid="popover-content">Popover content</div>}
        controlElement={<button onClick={() => setOpen((o) => !o)}>Toggle Popover</button>}
      />
    );
  });

  const popoverToggleButton = screen.getByRole('button', { name: 'Toggle Popover' });
  expect(popoverToggleButton).toBeVisible();

  expect(screen.queryByTestId('popover-content')).toBeNull();

  await user.click(popoverToggleButton);

  expect(screen.queryByTestId('popover-content')).toBeVisible();
});

test('popover default placement ltr bottom center', async () => {
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
      top: '200px',
      left: '50px',
    },
  });
});

test('popover default placement rtl bottom center', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '50px',
    },
  });
});

test('popover ltr bottom-start placement', async () => {
  await popoverPlacementTest({
    placement: 'bottom-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '0px',
    },
  });
});

test('popover ltr bottom-center placement', async () => {
  await popoverPlacementTest({
    placement: 'bottom-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '50px',
    },
  });
});

test('popover ltr bottom-end placement', async () => {
  await popoverPlacementTest({
    placement: 'bottom-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '100px',
    },
  });
});

test('popover ltr right-start placement', async () => {
  await popoverPlacementTest({
    placement: 'right-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '0px',
      left: '200px',
    },
  });
});

test('popover ltr right-center placement', async () => {
  await popoverPlacementTest({
    placement: 'right-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '50px',
      left: '200px',
    },
  });
});

test('popover ltr right-end placement', async () => {
  await popoverPlacementTest({
    placement: 'right-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '100px',
      left: '200px',
    },
  });
});

test('popover ltr top-start placement', async () => {
  await popoverPlacementTest({
    placement: 'top-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '-100px',
      left: '0px',
    },
  });
});

test('popover ltr top-center placement', async () => {
  await popoverPlacementTest({
    placement: 'top-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '-100px',
      left: '50px',
    },
  });
});

test('popover ltr top-end placement', async () => {
  await popoverPlacementTest({
    placement: 'top-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '-100px',
      left: '100px',
    },
  });
});

test('popover ltr left-start placement', async () => {
  await popoverPlacementTest({
    placement: 'left-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '0px',
      left: '-100px',
    },
  });
});

test('popover ltr left-center placement', async () => {
  await popoverPlacementTest({
    placement: 'left-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '50px',
      left: '-100px',
    },
  });
});

test('popover ltr left-end placement', async () => {
  await popoverPlacementTest({
    placement: 'left-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '100px',
      left: '-100px',
    },
  });
});

test('popover rtl left-start placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'left-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '0px',
      left: '-100px',
    },
  });
});

test('popover rtl left-center placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'left-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '50px',
      left: '-100px',
    },
  });
});

test('popover rtl left-end placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'left-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '100px',
      left: '-100px',
    },
  });
});

test('popover rtl right-start placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'right-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '0px',
      left: '200px',
    },
  });
});

test('popover rtl right-center placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'right-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '50px',
      left: '200px',
    },
  });
});

test('popover rtl right-end placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'right-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '100px',
      left: '200px',
    },
  });
});

test('popover rtl top-start placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'top-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '-100px',
      left: '100px',
    },
  });
});

test('popover rtl top-center placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'top-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '-100px',
      left: '50px',
    },
  });
});

test('popover rtl top-end placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'top-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '-100px',
      left: '0px',
    },
  });
});

test('popover rtl bottom-start placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'bottom-start',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '100px',
    },
  });
});

test('popover rtl bottom-center placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'bottom-center',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '50px',
    },
  });
});

test('popover rtl bottom-end placement', async () => {
  await popoverPlacementTest({
    layoutDirection: 'rtl',
    placement: 'bottom-end',
    popoverDimensions: {
      width: 100,
      height: 100,
    },
    toggleButtonDimensions: {
      height: 200,
      width: 200,
    },
    expectedStyles: {
      top: '200px',
      left: '0px',
    },
  });
});

// TODO: triangle bump tests

async function popoverPlacementTest(props: {
  placement?: PopoverPlacement;
  layoutDirection?: 'ltr' | 'rtl';
  popoverDimensions?: { width: number; height: number };
  toggleButtonDimensions?: Partial<DOMRect>;
  expectedStyles: Record<string, unknown>;
}) {
  render(() => {
    const [open, setOpen] = createSignal(false);
    return (
      <Popover
        open={open()}
        {...{ placement: props.placement, layoutDirection: props.layoutDirection }}
        close={() => null}
        popoverContent={
          <div style={{ width: '100px', 'aspect-ratio': 1 }} data-testid="popover-content">
            Popover content
          </div>
        }
        controlElement={
          <button
            data-testid="control-element"
            style={{ width: '200px', height: '100px' }}
            onClick={() => setOpen((o) => !o)}
          >
            Toggle Popover
          </button>
        }
      />
    );
  });

  const popoverContentRoot = screen.queryByTestId('popover-content-root');
  const popoverToggleButton = screen.getByRole('button', { name: 'Toggle Popover' });

  assert(popoverContentRoot);
  assert(popoverToggleButton);

  // @ts-ignore
  popoverContentRoot.getBoundingClientRect = vi.fn(() => constructBoundingClientRect(props.popoverDimensions));
  // @ts-ignore
  popoverToggleButton.getBoundingClientRect = vi.fn(() => constructBoundingClientRect(props.toggleButtonDimensions));

  // open popover
  await user.click(popoverToggleButton);

  expect(popoverContentRoot).toHaveStyle(props.expectedStyles);
}
