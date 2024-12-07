import { not } from "@vighnesh153/tools";
import {
  BrushThickness,
  type EventMode,
  type IColor,
} from "@vighnesh153/drawing-app";

import { CloseIcon } from "@/icons/CloseIcon.tsx";
import { PenIcon } from "@/icons/PenIcon.tsx";
import { FillDripIcon } from "@/icons/FillDripIcon.tsx";
import { RotateLeftIcon } from "@/icons/RotateLeftIcon.tsx";
import { RotateRightIcon } from "@/icons/RotateRightIcon.tsx";

import { ModeButton } from "./ModeButton.tsx";
import { ColorButton } from "./ColorButton.tsx";
import { BrushThicknessButton } from "./BrushThicknessButton.tsx";
import { ActionButton } from "./ActionButton.tsx";
import { classes } from "@/utils/index.ts";

function ToolbarDivider() {
  return <div class="h-8 w-px bg-primary" />;
}

export type ToolbarProps = {
  selectedColor: IColor;
  selectedEventMode: EventMode;
  selectedBrushThickness: BrushThickness;
  isUndoAvailable: boolean;
  isRedoAvailable: boolean;
  colors: IColor[];
  brushThicknessList: BrushThickness[];
  onModeChange: (newMode: EventMode) => void;
  onColorChange: (newColor: IColor) => void;
  onBrushThicknessChange: (newBrushThickness: BrushThickness) => void;
  onUndoButtonClick: () => void;
  onRedoButtonClick: () => void;
  onClearButtonClick: () => void;
};

export function Toolbar(props: ToolbarProps) {
  return (
    <div
      class={classes(
        "w-fit px-6 pt-5 pb-4 mx-auto bg-text rounded-lg",
        "flex items-center gap-6 flex-wrap",
      )}
    >
      {/* Mode */}
      <div class="flex gap-6">
        <ModeButton
          title="Draw"
          isSelected={props.selectedEventMode === "draw"}
          onClick={() => props.onModeChange("draw")}
        >
          <PenIcon class="w-6 h-6" />
        </ModeButton>
        <ModeButton
          title="Fill"
          isSelected={props.selectedEventMode === "fill"}
          onClick={() => props.onModeChange("fill")}
        >
          <FillDripIcon class="w-6 h-6" />
        </ModeButton>
      </div>

      <ToolbarDivider />

      {/* Color button */}
      <div>
        <ColorButton
          selectedColor={props.selectedColor.rgbaString}
          colors={props.colors}
          onColorChange={(newColor) => props.onColorChange(newColor)}
        />
      </div>

      <ToolbarDivider />

      {/* Size button */}
      <div>
        <BrushThicknessButton
          selectedBrushThickness={props.selectedBrushThickness}
          selectedColor={props.selectedColor.rgbaString}
          brushThicknessList={props.brushThicknessList}
          onBrushThicknessChange={(newBrushThickness) =>
            props.onBrushThicknessChange(newBrushThickness)}
        />
      </div>

      <ToolbarDivider />

      {/* Undo button */}
      <ActionButton
        title="Undo"
        disabled={not(props.isUndoAvailable)}
        onClick={props.onUndoButtonClick}
      >
        <RotateLeftIcon class="w-[25px]" />
      </ActionButton>

      <ToolbarDivider />

      {/* Redo button */}
      <ActionButton
        title="Redo"
        disabled={not(props.isRedoAvailable)}
        onClick={props.onRedoButtonClick}
      >
        <RotateRightIcon class="w-[25px]" />
      </ActionButton>

      <ToolbarDivider />

      {/* Clear button */}
      <ActionButton title="Clear" onClick={props.onClearButtonClick}>
        <CloseIcon class="w-[20px]" stroke="inherit" />
      </ActionButton>
    </div>
  );
}
