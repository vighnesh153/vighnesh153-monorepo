const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-import': {},
    'postcss-custom-media': {},
    autoprefixer: {},
    cssnano: {},
  },
  // plugins: [
  //   require('tailwindcss'),
  //   postcssImport,
  //   postcssCustomMedia,
  //   autoprefixer,
  //   cssnano({ preset: 'advanced' }),
  // ],
};
