import { atom } from "nanostores";
import { Color, type IColor } from "@vighnesh153/drawing-app";

export const colorStore = atom<IColor>(Color.Black);
