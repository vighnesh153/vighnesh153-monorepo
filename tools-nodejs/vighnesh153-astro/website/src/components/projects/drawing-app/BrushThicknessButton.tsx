import { For } from "solid-js";
import { BrushThickness } from "@vighnesh153/drawing-app";
import { PopupButton } from "./PopupButton.tsx";

export type BrushThicknessButtonProps = {
  selectedBrushThickness: BrushThickness;
  selectedColor: string;
  brushThicknessList: BrushThickness[];
  onBrushThicknessChange: (newBrushThickness: BrushThickness) => void;
};

export function BrushThicknessButton(props: BrushThicknessButtonProps) {
  return (
    <PopupButton
      title="Size"
      popupContent={(togglePopup) => (
        <div
          slot="popup-content"
          class="w-64 mx-auto flex gap-2 flex-wrap items-center justify-center"
        >
          <For each={props.brushThicknessList}>
            {(brushThickness) => (
              <button
                class="w-[40px] aspect-square rounded-full grid place-items-center border border-secondary focus-visible:outline-secondary"
                on:click={() => {
                  props.onBrushThicknessChange(brushThickness);
                  togglePopup("closed");
                }}
              >
                <span
                  class={`inline-block aspect-square rounded-full`}
                  style={`width: ${brushThickness}px; background: ${props.selectedColor}`}
                />
              </button>
            )}
          </For>
        </div>
      )}
    >
      {() => (
        <span
          class={`inline-block aspect-square rounded-full`}
          style={`width: ${props.selectedBrushThickness}px; background: ${props.selectedColor}`}
        />
      )}
    </PopupButton>
  );
}
