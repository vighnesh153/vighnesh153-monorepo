const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssUrl = require('postcss-url');

module.exports = {
  plugins: [
    postcssImport,
    postcssCustomMedia,
    postcssUrl,
    autoprefixer,
    cssnano({ preset: 'advanced' }),
    postcssReporter,
  ],
};
