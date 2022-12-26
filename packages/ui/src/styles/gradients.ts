import { CSSProperties } from 'react';

type Color = CSSProperties['color'];
type Gradient = CSSProperties['background'];

function gradient(name: string, direction: string, colors: Array<Color>): Gradient {
  return `${name}(${direction}, ${colors.join(', ')})`;
}

function linearGradient(direction: string, colors: Array<Color>): Gradient {
  return gradient('linear-gradient', direction, colors);
}

function radialGradient(direction: string, colors: Array<Color>): Gradient {
  return gradient('radial-gradient', direction, colors);
}

function conicGradient(direction: string, colors: Array<Color>): Gradient {
  return gradient('conic-gradient', direction, colors);
}

function combineGradients(...gradients: Gradient[]): Gradient {
  return gradients.join(', ');
}

/**
 * Application
 * - background-image: ${Gradients.Variant2}
 */
export const Gradients = {
  Variant1: linearGradient('to bottom right', [
    '#1f005c',
    '#5b0060',
    '#870160',
    '#ac255e',
    '#ca485c',
    '#e16b5c',
    '#f39060',
    '#ffb56b',
  ]),
  Variant2: linearGradient('to bottom right', ['#48005c', '#8300e2', '#a269ff']),
  Variant3: combineGradients(
    radialGradient('circle at top right', ['hsl(180 100% 50%)', 'hsla(180 100% 50% 0%)']),
    radialGradient('circle at bottom left', ['hsl(328 100% 54%)', 'hsla(328 100% 54% 0%)'])
  ),
  Variant4: linearGradient('to bottom right', ['#00F5A0', '#00D9F5']),
  Variant5: conicGradient('from -270deg at 75%, at 110%', ['fuchsia', 'floralwhite']),
  Variant6: conicGradient('from -90deg at top left', ['black', 'white']),
  Variant7: linearGradient('to bottom right', ['#72C6EF', '#004E8F']),
  Variant8: 'conic-gradient(from 90deg at 50%, at 0%, #111, 50%, #222, #111)',
  Variant9: conicGradient('from .5turn at bottom center', ['lightblue', 'white']),
  Variant10: conicGradient('from 90deg at 40%, at -25%', [
    '#ffd700',
    '#f79d03',
    '#ee6907',
    '#e6390a',
    '#de0d0d',
    '#d61039',
    '#cf1261',
    '#c71585',
    '#cf1261',
    '#d61039',
    '#de0d0d',
    '#ee6907',
    '#f79d03',
    '#ffd700',
    '#ffd700',
    '#ffd700',
  ]),
  Variant11: conicGradient('at bottom left', ['deeppink', 'cyan']),
  Variant12: conicGradient('from 90deg at 25%, at -10%', ['#ff4500', '#d3f340', '#7bee85', '#afeeee', '#7bee85']),
  Variant13: radialGradient('circle at 50%, at 200%', [
    '#000142',
    '#3b0083',
    '#b300c3',
    '#ff059f',
    '#ff4661',
    '#ffad86',
    '#fff3c7',
  ]),
  Variant14: conicGradient('at top right', ['lime', 'cyan']),
  Variant15: linearGradient('to bottom right', ['#c7d2fe', '#fecaca', '#fef3c7']),
  Variant16: radialGradient('circle at 50%, at -250%', ['#374151', '#111827', '#000']),
  Variant17: conicGradient('from -90deg at 50%, at -25%', ['blue', 'blueviolet']),
  Variant18: combineGradients(
    'linear-gradient(0deg, hsla(0 100% 50% / 80%), hsla(0 100% 50% / 0) 75%)',
    'linear-gradient(60deg, hsla(60 100% 50% / 80%), hsla(60 100% 50% / 0) 75%)',
    'linear-gradient(120deg, hsla(120 100% 50% / 80%), hsla(120 100% 50% / 0) 75%)',
    'linear-gradient(180deg, hsla(180 100% 50% / 80%), hsla(180 100% 50% / 0) 75%)',
    'linear-gradient(240deg, hsla(240 100% 50% / 80%), hsla(240 100% 50% / 0) 75%)',
    'linear-gradient(300deg, hsla(300 100% 50% / 80%), hsla(300 100% 50% / 0) 75%)'
  ),
  Variant19: linearGradient('to bottom right', ['#ffe259', '#ffa751']),
  Variant20: conicGradient('from -135deg at -10% center', [
    '#ffa500',
    '#ff7715',
    '#ff522a',
    '#ff3f47',
    '#ff5482',
    '#ff69b4',
  ]),
  Variant21: conicGradient('from -90deg at 25%, at 115%', [
    '#ff0000',
    '#ff0066',
    '#ff00cc',
    '#cc00ff',
    '#6600ff',
    '#0000ff',
    '#0000ff',
    '#0000ff',
    '#0000ff',
  ]),
  Variant22: linearGradient('to bottom right', ['#acb6e5', '#86fde8']),
  Variant23: linearGradient('to bottom right', ['#536976', '#292E49']),
  Variant24: 'conic-gradient(from .5turn at 0%, at 0%, #00c476, 10%, #82b0ff, 90%, #00c476)',
  Variant25: conicGradient('at 125%, at 50%', ['#b78cf7', '#ff7c94', '#ffcf0d', '#ff7c94', '#b78cf7']),
  Variant26: linearGradient('to bottom right', ['#9796f0', '#fbc7d4']),
  Variant27: conicGradient('from .5turn at bottom left', ['deeppink', '#639']),
  Variant28: conicGradient('from -90deg at 50%, at 105%', ['white', 'orchid']),
  Variant29: combineGradients(
    radialGradient('circle at top right', ['hsl(250 100% 85%)', 'hsla(250 100% 85% 0%)']),
    radialGradient('circle at bottom left', ['hsl(220 90% 75%)', 'hsla(220 90% 75% 0%)'])
  ),
  Variant30: combineGradients(
    radialGradient('circle at top right', ['hsl(150 100% 50%)', 'hsla(150 100% 50% 0%)']),
    radialGradient('circle at bottom left', ['hsl(150 100% 84%)', 'hsla(150 100% 84% 0%)'])
  ),
};
