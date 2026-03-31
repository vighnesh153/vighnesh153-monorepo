import type { JSX } from "react";
import { BrushThickness } from "@vighnesh153/drawing-app";
import { PopupButton } from "./PopupButton.tsx";

export type BrushThicknessButtonProps = {
  selectedBrushThickness: BrushThickness;
  selectedColor: string;
  brushThicknessList: BrushThickness[];
  onBrushThicknessChange: (newBrushThickness: BrushThickness) => void;
};

export function BrushThicknessButton(
  props: BrushThicknessButtonProps,
): JSX.Element {
  return (
    <PopupButton
      title="Size"
      popupContent={(togglePopup) => (
        <div className="w-64 mx-auto flex gap-2 flex-wrap items-center justify-center">
          {props.brushThicknessList.map((brushThickness) => (
            <button
              key={brushThickness}
              className="w-[40px] aspect-square rounded-full grid place-items-center border border-secondary focus-visible:outline-secondary"
              onClick={() => {
                props.onBrushThicknessChange(brushThickness);
                togglePopup("closed");
              }}
            >
              <span
                className="inline-block aspect-square rounded-full"
                style={{
                  width: `${brushThickness}px`,
                  backgroundColor: props.selectedColor,
                }}
              />
            </button>
          ))}
        </div>
      )}
    >
      {() => (
        <span
          className="inline-block aspect-square rounded-full"
          style={{
            width: `${props.selectedBrushThickness}px`,
            backgroundColor: props.selectedColor,
          }}
        />
      )}
    </PopupButton>
  );
}
