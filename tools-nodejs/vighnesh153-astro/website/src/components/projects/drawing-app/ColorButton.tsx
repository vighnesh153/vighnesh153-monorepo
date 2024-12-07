import { For } from "solid-js";
import type { IColor } from "@vighnesh153/drawing-app";
import { PopupButton } from "./PopupButton.tsx";

export type ColorButtonProps = {
  selectedColor: string;
  colors: IColor[];
  onColorChange: (newColor: IColor) => void;
};

export function ColorButton(props: ColorButtonProps) {
  return (
    <PopupButton
      title="Color"
      popupContent={(togglePopup) => (
        <div
          slot="popup-content"
          class="w-96 mx-auto flex gap-2 flex-wrap justify-center"
        >
          <For each={props.colors}>
            {(color) => (
              <button
                style={`background-color: ${color.rgbaString}`}
                class="w-10 h-10 rounded-full border border-secondary focus-visible:outline-secondary"
                on:click={() => {
                  props.onColorChange(color);
                  togglePopup("closed");
                }}
              />
            )}
          </For>
        </div>
      )}
      buttonStyles={`background-color: ${props.selectedColor}`}
    />
  );
}
