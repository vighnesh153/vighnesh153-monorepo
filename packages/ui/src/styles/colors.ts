import {
  Gray,
  Stone,
  Red,
  Pink,
  Purple,
  Violet,
  Indigo,
  Blue,
  Cyan,
  Teal,
  Green,
  Lime,
  Yellow,
  Orange,
  Choco,
  Brown,
  Sand,
  Camo,
  Jungle,
} from 'open-props/src/props.colors';
import { IColor } from '@vighnesh153/types';

function generateColors(shadesContainer: Record<string, string>, shadeName: string): IColor {
  const colorShades: Record<string, string> = {};
  for (let i = 0; i <= 12; i++) {
    colorShades[`Shade${i}`] = shadesContainer[`--${shadeName}-${i}`];
  }
  return colorShades as unknown as IColor;
}

export const Colors = {
  Gray: generateColors(Gray, 'gray'),
  Stone: generateColors(Stone, 'stone'),
  Red: generateColors(Red, 'red'),
  Pink: generateColors(Pink, 'pink'),
  Purple: generateColors(Purple, 'purple'),
  Violet: generateColors(Violet, 'violet'),
  Indigo: generateColors(Indigo, 'indigo'),
  Blue: generateColors(Blue, 'blue'),
  Cyan: generateColors(Cyan, 'cyan'),
  Teal: generateColors(Teal, 'teal'),
  Green: generateColors(Green, 'green'),
  Lime: generateColors(Lime, 'lime'),
  Yellow: generateColors(Yellow, 'yellow'),
  Orange: generateColors(Orange, 'orange'),
  Choco: generateColors(Choco, 'choco'),
  Brown: generateColors(Brown, 'brown'),
  Sand: generateColors(Sand, 'sand'),
  Camo: generateColors(Camo, 'camo'),
  Jungle: generateColors(Jungle, 'jungle'),
} satisfies Record<string, IColor>;
