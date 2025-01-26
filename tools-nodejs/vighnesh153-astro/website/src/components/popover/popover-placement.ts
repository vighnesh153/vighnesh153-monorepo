import type {
  PopoverLayoutDirection,
  PopoverPlacement,
} from "./externalTypes.ts";

export function updatePopoverPlacementBasedOnPlacement(
  placement: PopoverPlacement,
  layoutDirection: PopoverLayoutDirection,
  popoverContentRoot: HTMLDivElement,
  controlEl: HTMLElement,
): void {
  const absolutePlacement = calculateAbsolutePlacementBasedOnDirection(
    placement,
    layoutDirection,
  );

  const controlElRect = controlEl.getBoundingClientRect();
  const popoverRect = popoverContentRoot.getBoundingClientRect();

  switch (absolutePlacement) {
    case "top-left":
      alignPopoverLeftWithControlElementLeft(popoverContentRoot, controlElRect);
      alignPopoverBottomWithControlElementTop(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      break;
    case "top-center":
      centerHorizontally(popoverContentRoot, controlElRect, popoverRect);
      alignPopoverBottomWithControlElementTop(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      break;
    case "top-right":
      alignPopoverRightWithControlElementRight(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      alignPopoverBottomWithControlElementTop(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      break;

    case "right-top":
      alignPopoverLeftWithControlElementRight(
        popoverContentRoot,
        controlElRect,
      );
      alignPopoverTopWithControlElementTop(popoverContentRoot, controlElRect);
      break;
    case "right-center":
      alignPopoverLeftWithControlElementRight(
        popoverContentRoot,
        controlElRect,
      );
      centerVertically(popoverContentRoot, controlElRect, popoverRect);
      break;
    case "right-bottom":
      alignPopoverLeftWithControlElementRight(
        popoverContentRoot,
        controlElRect,
      );
      alignPopoverBottomWithControlElementBottom(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      break;

    case "bottom-left":
      alignPopoverLeftWithControlElementLeft(popoverContentRoot, controlElRect);
      alignPopoverTopWithControlElementBottom(
        popoverContentRoot,
        controlElRect,
      );
      break;
    case "bottom-center":
      centerHorizontally(popoverContentRoot, controlElRect, popoverRect);
      alignPopoverTopWithControlElementBottom(
        popoverContentRoot,
        controlElRect,
      );
      break;
    case "bottom-right":
      alignPopoverRightWithControlElementRight(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      alignPopoverTopWithControlElementBottom(
        popoverContentRoot,
        controlElRect,
      );
      break;

    case "left-top":
      alignPopoverRightWithControlElementLeft(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      alignPopoverTopWithControlElementTop(popoverContentRoot, controlElRect);
      break;
    case "left-center":
      alignPopoverRightWithControlElementLeft(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      centerVertically(popoverContentRoot, controlElRect, popoverRect);
      break;
    case "left-bottom":
      alignPopoverRightWithControlElementLeft(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      alignPopoverBottomWithControlElementBottom(
        popoverContentRoot,
        controlElRect,
        popoverRect,
      );
      break;
  }
}

// To map layout direction specific placement to absolute placement
type AbsolutePlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "right-top"
  | "right-center"
  | "right-bottom"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom";

const ltrPlacementMapping: Record<PopoverPlacement, AbsolutePlacement> = {
  "top-start": "top-left",
  "top-center": "top-center",
  "top-end": "top-right",

  "right-start": "right-top",
  "right-center": "right-center",
  "right-end": "right-bottom",

  "bottom-start": "bottom-left",
  "bottom-center": "bottom-center",
  "bottom-end": "bottom-right",

  "left-start": "left-top",
  "left-center": "left-center",
  "left-end": "left-bottom",
};

const rtlPlacementMapping: Record<PopoverPlacement, AbsolutePlacement> = {
  "top-start": "top-right",
  "top-center": "top-center",
  "top-end": "top-left",

  "right-start": "right-top",
  "right-center": "right-center",
  "right-end": "right-bottom",

  "bottom-start": "bottom-right",
  "bottom-center": "bottom-center",
  "bottom-end": "bottom-left",

  "left-start": "left-top",
  "left-center": "left-center",
  "left-end": "left-bottom",
};

const itemsAlignment = {
  "start": "items-start",
  "center": "items-center",
  "end": "items-end",
};

function calculateAbsolutePlacementBasedOnDirection(
  placement: PopoverPlacement,
  layoutDirection: PopoverLayoutDirection,
): AbsolutePlacement {
  if (layoutDirection == "ltr") {
    return ltrPlacementMapping[placement];
  } else {
    return rtlPlacementMapping[placement];
  }
}

function centerHorizontally(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
  popoverRect: DOMRect,
) {
  popoverContentRoot.style.left = `${
    controlElRect.left + (controlElRect.width - popoverRect.width) / 2
  }px`;
}

function centerVertically(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
  popoverRect: DOMRect,
) {
  popoverContentRoot.style.top = `${
    controlElRect.top + (controlElRect.height - popoverRect.height) / 2
  }px`;
}

function alignPopoverLeftWithControlElementLeft(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
) {
  popoverContentRoot.style.left = `${controlElRect.left}px`;
}

function alignPopoverRightWithControlElementRight(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
  popoverRect: DOMRect,
) {
  popoverContentRoot.style.left = `${
    controlElRect.left + controlElRect.width - popoverRect.width
  }px`;
}

function alignPopoverLeftWithControlElementRight(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
) {
  popoverContentRoot.style.left = `${
    controlElRect.left + controlElRect.width
  }px`;
}

function alignPopoverRightWithControlElementLeft(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
  popoverRect: DOMRect,
) {
  popoverContentRoot.style.left = `${controlElRect.left - popoverRect.width}px`;
}

function alignPopoverTopWithControlElementTop(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
) {
  popoverContentRoot.style.top = `${controlElRect.top}px`;
}

function alignPopoverBottomWithControlElementBottom(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
  popoverRect: DOMRect,
) {
  popoverContentRoot.style.top = `${
    controlElRect.top + controlElRect.height - popoverRect.height
  }px`;
}

function alignPopoverTopWithControlElementBottom(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
) {
  popoverContentRoot.style.top = `${
    controlElRect.top + controlElRect.height
  }px`;
}

function alignPopoverBottomWithControlElementTop(
  popoverContentRoot: HTMLDivElement,
  controlElRect: DOMRect,
  popoverRect: DOMRect,
) {
  popoverContentRoot.style.top = `${controlElRect.top - popoverRect.height}px`;
}

export function computeFlexClassesForPopoverContentRootBasedOnPlacement(
  placement: PopoverPlacement,
  layoutDirection: PopoverLayoutDirection,
): string {
  const absolutePlacement = calculateAbsolutePlacementBasedOnDirection(
    placement,
    layoutDirection,
  );
  const outputClasses: string[] = [];
  const [topBottomLeftRight] = absolutePlacement.split("-");
  const [, startCenterEnd] = placement.split("-") as [
    unknown,
    keyof typeof itemsAlignment,
  ];
  switch (topBottomLeftRight) {
    case "top":
      outputClasses.push("flex-col-reverse");
      break;
    case "right":
      if (layoutDirection === "ltr") {
        outputClasses.push("flex-row");
      } else {
        outputClasses.push("flex-row-reverse");
      }
      break;
    case "bottom":
      outputClasses.push("flex-col");
      break;
    case "left":
      if (layoutDirection === "ltr") {
        outputClasses.push("flex-row-reverse");
      } else {
        outputClasses.push("flex-row");
      }
      break;
  }
  outputClasses.push(itemsAlignment[startCenterEnd]);
  return outputClasses.join(" ");
}
