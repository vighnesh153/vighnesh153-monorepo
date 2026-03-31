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
          className="w-96 mx-auto flex gap-2 flex-wrap justify-center"
        >
          {props.colors.map((color) => (
            <button
              key={color.rgbaString}
              style={{ backgroundColor: color.rgbaString }}
              className="w-10 h-10 rounded-full border border-secondary focus-visible:outline-secondary"
              onClick={() => {
                props.onColorChange(color);
                togglePopup("closed");
              }}
            />
          ))}
        </div>
      )}
      buttonStyles={{ backgroundColor: props.selectedColor }}
    />
  );
}
