import {
  alphaFromArgb,
  argbFromHex,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  redFromArgb,
} from "@material/material-color-utilities";

import { Rgba } from "./rgba.ts";

export class Color {
  static fromArgb(argb: number): Color {
    return new Color(argb);
  }

  static fromHex(hex: string): Color {
    return new Color(argbFromHex(hex));
  }

  static fromHct(hct: Hct): Color {
    return new Color(hct.toInt());
  }

  readonly hex: string;
  readonly hct: Hct;
  readonly rgba: Rgba;

  private constructor(readonly argb: number) {
    this.hex = hexFromArgb(argb);
    this.hct = Hct.fromInt(argb);
    this.rgba = new Rgba(
      redFromArgb(argb),
      greenFromArgb(argb),
      blueFromArgb(argb),
      alphaFromArgb(argb),
    );
  }
}
