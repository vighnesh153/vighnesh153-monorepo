const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    postcssImport,
    postcssCustomMedia,
    autoprefixer,
    cssnano({ preset: 'advanced' }),
  ],
};
