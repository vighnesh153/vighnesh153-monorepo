import toRgba from 'color-rgba';

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export enum Color {
  Black = 'hsl(0, 0%, 0%)',
  Gray = 'hsl(0, 0%, 34%)',
  LightGray = 'hsl(0, 0%, 63%)',
  Purple = 'hsl(291, 64%, 42%)',
  LightBlue = 'hsl(229, 100%, 81%)',
  DarkBlue = 'hsl(229, 68%, 50%)',
  SkyBlue = 'hsl(180, 67%, 49%)',
  LightGreen = 'hsl(114, 39%, 63%)',
  Green = 'hsl(122, 39%, 49%)',
  LimeGreen = 'hsl(73, 100%, 50%)',
  Yellow = 'hsl(55, 100%, 60%)',
  Orange = 'hsl(28, 100%, 60%)',
  Peach = 'hsl(46, 51%, 82%)',
  Brown = 'hsl(28, 68%, 30%)',
  Pink = 'hsl(339, 81%, 85%)',
  Red = 'hsl(4, 90%, 58%)',
  DarkRed = 'hsl(0, 66%, 41%)',
  White = 'hsl(0, 0%, 100%)',
}

export const colorToRgba = (color: string) => {
  const converted = toRgba(color);
  if (!converted) throw new Error('Failed to parse');
  const [r, g, b, a] = converted;
  return { r: Math.floor(r), g: Math.floor(g), b: Math.floor(b), a };
};
