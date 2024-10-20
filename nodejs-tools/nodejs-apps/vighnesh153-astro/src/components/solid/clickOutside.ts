import { type Accessor, onCleanup } from "solid-js";

type ClickOutsideAccessorProps = {
  ignoreElements: HTMLElement[];

  /**
   * Called if the click is outside all the ignore elements
   */
  clickOutsideCallback: () => void;
};

export function clickOutside(
  element: HTMLElement,
  accessor: Accessor<ClickOutsideAccessorProps>,
) {
  const onClick = ({ target }: MouseEvent) => {
    const { ignoreElements, clickOutsideCallback } = accessor();
    if (
      element.contains(target as Node) ||
      ignoreElements.some((ignoreElement) =>
        ignoreElement.contains(target as Node)
      )
    ) {
      return;
    }
    clickOutsideCallback();
  };

  document.body.addEventListener("click", onClick);
  onCleanup(() => document.body.removeEventListener("click", onClick));
}
