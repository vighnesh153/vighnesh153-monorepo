import { atom } from "nanostores";
import { BrushThickness } from "@vighnesh153/drawing-app";

export const brushThicknessStore = atom<BrushThickness>(BrushThickness.sm);
